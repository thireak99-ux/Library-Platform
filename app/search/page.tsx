import type { Metadata } from "next";
import { SearchForm } from "@/components/search-form";
import { BookGrid } from "@/components/book-grid";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { getPage } from "@/lib/format";
import { searchBooks } from "@/lib/open-library";

export const metadata: Metadata = {
  title: "Search books",
  description: "Search books by title, author, or keyword in the Open Library catalog.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[]; page?: string | string[] }> }) {
  const params = await searchParams;
  const query = (Array.isArray(params.q) ? params.q[0] : params.q ?? "").trim().slice(0, 200);
  const page = getPage(params.page);
  const result = query ? await searchBooks(query, page) : null;

  return <><div className="pt-8 pb-[30px] min-[561px]:pt-11"><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">THE CATALOG</p><h1 className="text-[clamp(2.3rem,4.5vw,3.65rem)] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.45rem] min-[561px]:text-5xl">Find a good book.</h1><p className="mt-[15px] text-[#646b62]">Search by title, author, or a little inspiration.</p></div><SearchForm query={query} />
    {result ? <section className="mt-[38px]"><div className="mb-6 block gap-5 min-[561px]:flex min-[561px]:items-baseline min-[561px]:justify-between"><h2 className="break-words text-[1.65rem] font-bold leading-[1.2] tracking-[-.025em]">Results for “{query}”</h2><p className="whitespace-nowrap text-sm text-[#646b62] max-[560px]:mt-2">{result.exact ? "" : "About "}{result.total.toLocaleString()} {result.total === 1 ? "book" : "books"}</p></div>{result.books.length ? <BookGrid books={result.books} /> : <EmptyState title={result.total ? "No books on this page" : "No books found"} message={result.total ? "Try the first page of these results." : "Try a shorter title, an author’s name, or a different spelling."} href={result.total ? `/search?${new URLSearchParams({ q: query, page: "1" })}` : "/#subjects"} label={result.total ? "Go to page 1" : "Browse subjects"} />}<Pagination page={page} total={result.total} pathname="/search" query={query} /></section> : <EmptyState title="What would you like to read?" message="Enter a title, author, or keyword above to explore the Open Library catalog." />}
  </>;
}
