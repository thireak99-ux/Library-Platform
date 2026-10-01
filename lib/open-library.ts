import { unstable_cache } from "next/cache";
import { normalizeId } from "@/lib/format";
import type { AuthorRecord, Book, SearchBook, SubjectBook, WorkRecord } from "@/types";

export const PAGE_SIZE = 12;
const BASE_URL = "https://openlibrary.org";
let nextRequestAt = 0;

export class OpenLibraryError extends Error {
  constructor(public status: number) {
    super("Open Library is temporarily unavailable.");
    this.name = "OpenLibraryError";
  }
}

const requestJson = unstable_cache(async (path: string) => {
  const startAt = Math.max(Date.now(), nextRequestAt);
  nextRequestAt = startAt + 1100;
  await new Promise((resolve) => setTimeout(resolve, startAt - Date.now()));

  const headers: Record<string, string> = { Accept: "application/json" };
  const contact = process.env.OPEN_LIBRARY_CONTACT?.trim();
  if (contact) headers["User-Agent"] = `LibriHub (${contact})`;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers,
      signal: AbortSignal.timeout(15000),
      cache: "no-store",
    });
  } catch {
    throw new OpenLibraryError(503);
  }

  if (response.status === 429) {
    const seconds = Number(response.headers.get("retry-after"));
    nextRequestAt = Math.max(nextRequestAt, Date.now() + (Number.isFinite(seconds) && seconds > 0 ? seconds : 60) * 1000);
  }
  if (!response.ok) throw new OpenLibraryError(response.status);

  try {
    return await response.json();
  } catch {
    throw new OpenLibraryError(502);
  }
}, ["open-library-v1"], { revalidate: 3600 });

export async function searchBooks(query: string, page = 1) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(PAGE_SIZE),
    fields: "key,title,author_name,cover_i,first_publish_year",
  });
  const data = await requestJson(`/search.json?${params}`) as { docs: SearchBook[]; numFound: number; numFoundExact?: boolean };
  if (!Array.isArray(data.docs) || typeof data.numFound !== "number") throw new OpenLibraryError(502);
  const books: Book[] = data.docs.filter((book) => /^OL\d+W$/.test(normalizeId(book.key))).map((book) => ({
    id: normalizeId(book.key), title: book.title, authors: book.author_name ?? [],
    coverId: book.cover_i, year: book.first_publish_year,
  }));
  return { books, total: data.numFound, exact: data.numFoundExact !== false };
}

export async function getBookDetails(workId: string) {
  const data = await requestJson(`/works/${encodeURIComponent(workId)}.json`) as WorkRecord;
  if (!data.key || typeof data.title !== "string") throw new OpenLibraryError(502);
  return data;
}

export async function getAuthorDetails(authorId: string) {
  const data = await requestJson(`/authors/${encodeURIComponent(authorId)}.json`) as AuthorRecord;
  if (!data.key || typeof data.name !== "string") throw new OpenLibraryError(502);
  return data;
}

export async function getAuthorWorks(authorId: string, page = 1) {
  const params = new URLSearchParams({ limit: String(PAGE_SIZE), offset: String((page - 1) * PAGE_SIZE) });
  const data = await requestJson(`/authors/${encodeURIComponent(authorId)}/works.json?${params}`) as { entries: WorkRecord[]; size: number };
  if (!Array.isArray(data.entries) || typeof data.size !== "number") throw new OpenLibraryError(502);
  const books: Book[] = data.entries.filter((book) => /^OL\d+W$/.test(normalizeId(book.key))).map((book) => ({
    id: normalizeId(book.key), title: book.title, authors: [], coverId: book.covers?.find((id) => id > 0),
  }));
  return { books, total: data.size };
}

export async function getSubjectBooks(subject: string, page = 1, ebooks = false) {
  const params = new URLSearchParams({ details: "true", limit: String(PAGE_SIZE), offset: String((page - 1) * PAGE_SIZE) });
  if (ebooks) params.set("ebooks", "true");
  const data = await requestJson(`/subjects/${encodeURIComponent(subject)}.json?${params}`) as { name: string; works: SubjectBook[]; work_count: number };
  if (!Array.isArray(data.works) || typeof data.work_count !== "number") throw new OpenLibraryError(502);
  const books: Book[] = data.works.filter((book) => /^OL\d+W$/.test(normalizeId(book.key))).map((book) => ({
    id: normalizeId(book.key), title: book.title,
    authors: (book.authors ?? []).map((author) => author.name).filter((name): name is string => Boolean(name)),
    coverId: book.cover_id, year: book.first_publish_year,
  }));
  return { books, total: data.work_count, name: data.name };
}
