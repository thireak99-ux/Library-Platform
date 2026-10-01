import type { SavedBook } from "@/types";

export const STORAGE_KEY = "librihub-books-v1";
export const READING_STATUSES = ["Want to Read", "Reading", "Finished"] as const;

export function readSavedBooks(): SavedBook[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const value: unknown = JSON.parse(raw);
  if (!Array.isArray(value)) throw new Error("Invalid saved library");
  const valid = value.every((book) => book && typeof book.id === "string" && /^OL\d+W$/.test(book.id) && typeof book.title === "string" && Array.isArray(book.authors) && book.authors.every((author: unknown) => typeof author === "string") && READING_STATUSES.includes(book.status) && (book.coverId === undefined || typeof book.coverId === "number") && (book.year === undefined || typeof book.year === "number"));
  if (!valid) throw new Error("Invalid saved book");
  return value.filter((book, index) => value.findIndex((item) => item.id === book.id) === index);
}
