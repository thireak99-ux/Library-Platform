import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Feather } from "lucide-react";
import { BookGrid } from "@/components/book-grid";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { RetryNotice } from "@/components/retry-notice";
import { authorPath, getPage, textValue } from "@/lib/format";
import { getAuthorDetails, getAuthorWorks, OpenLibraryError } from "@/lib/open-library";

export async function generateMetadata({ params }: { params: Promise<{ authorId: string }> }): Promise<Metadata> {
  const { authorId } = await params;
  if (!/^OL\d+A$/.test(authorId)) return { title: "Author unavailable", robots: { index: false } };
  try {
    const author = await getAuthorDetails(authorId);
    const description = textValue(author.bio)?.slice(0, 160) || `Explore books by ${author.name} on LibriHub.`;
    return {
      title: author.name,
      description,
      openGraph: { title: `${author.name} | LibriHub`, description },
    };
  } catch {
    return { title: "Author unavailable", robots: { index: false } };
  }
}

export default async function AuthorPage({ params, searchParams }: { params: Promise<{ authorId: string }>; searchParams: Promise<{ page?: string | string[] }> }) {
  const { authorId } = await params;
  if (!/^OL\d+A$/.test(authorId)) notFound();
  const page = getPage((await searchParams).page);
  const author = await getAuthorDetails(authorId).catch((error) => {
    if (error instanceof OpenLibraryError && error.status === 404) notFound();
    throw error;
  });
  const works = await getAuthorWorks(authorId, page).catch(() => null);
  const biography = textValue(author.bio);

  return <><Link href="/search" className="mt-[30px] inline-flex items-center gap-2 text-sm text-[#646b62] hover:text-[#174e3b] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]"><ArrowLeft size={16} aria-hidden="true" />Find more books</Link><section className="my-[35px] mb-[45px] grid grid-cols-1 gap-5 border-b border-[#e0e2d8] pb-[35px] min-[561px]:grid-cols-[110px_minmax(0,1fr)] min-[561px]:gap-8"><span className="grid size-[76px] place-items-center rounded-full bg-[#e8eee0] text-[#174e3b] min-[561px]:size-[110px]"><Feather size={38} strokeWidth={1.2} aria-hidden="true" /></span><div><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">BEHIND THE BOOKS</p><h1 className="break-words text-[2.8rem] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.4rem]">{author.name}</h1>{author.birth_date && <p className="mt-[15px] text-sm text-[#646b62]">Born {author.birth_date}{author.death_date ? ` · Died ${author.death_date}` : ""}</p>}<p className="whitespace-pre-line break-words leading-[1.85] text-[#565f54] my-5 max-w-[840px]">{biography || "A biography is not available for this author yet."}</p><a href={`https://openlibrary.org/authors/${encodeURIComponent(authorId)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-[7px] text-sm font-semibold text-[#174e3b] underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]">Author on Open Library<ArrowUpRight size={15} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></div></section><section className="mt-[38px]"><div className="mb-[23px] flex items-end justify-between gap-3 min-[561px]:gap-6 max-[560px]:items-center"><h2 className="break-words text-[1.8rem] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[1.55rem]">Works by {author.name}</h2>{works && <span className="text-sm text-[#646b62] max-[760px]:hidden">{works.total.toLocaleString()} works</span>}</div>{works ? <>{works.books.length ? <BookGrid books={works.books.map((book) => ({ ...book, authors: [author.name] }))} /> : <EmptyState title="No works on this page" message="Explore another page or return to the catalog." href={page > 1 ? authorPath(authorId) : "/search"} label={page > 1 ? "Go to page 1" : "Search books"} />}<Pagination page={page} total={works.total} pathname={authorPath(authorId)} /></> : <RetryNotice message="The author loaded, but their works are temporarily unavailable. Please try again shortly." />}</section></>;
}
