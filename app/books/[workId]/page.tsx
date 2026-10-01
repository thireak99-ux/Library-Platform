import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { SaveButton } from "@/components/save-button";
import { getAuthorDetails, getBookDetails, OpenLibraryError } from "@/lib/open-library";
import { authorPath, normalizeId, subjectPath, textValue } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ workId: string }> }): Promise<Metadata> {
  const { workId } = await params;
  if (!/^OL\d+W$/.test(workId)) return { title: "Book unavailable", robots: { index: false } };
  try {
    const work = await getBookDetails(workId);
    const description = textValue(work.description)?.slice(0, 160) || `Explore ${work.title} on LibriHub.`;
    return {
      title: work.title,
      description,
      openGraph: { title: `${work.title} | LibriHub`, description },
    };
  } catch {
    return { title: "Book unavailable", robots: { index: false } };
  }
}

export default async function BookPage({ params }: { params: Promise<{ workId: string }> }) {
  const { workId } = await params;
  if (!/^OL\d+W$/.test(workId)) notFound();
  const work = await getBookDetails(workId).catch((error) => {
    if (error instanceof OpenLibraryError && error.status === 404) notFound();
    throw error;
  });
  const authorIds = [...new Set((work.authors ?? []).map((item) => normalizeId(item.author?.key ?? "")).filter((id) => /^OL\d+A$/.test(id)))];
  const authors: { id: string; name: string; available: boolean }[] = [];
  for (const id of authorIds.slice(0, 5)) {
    try {
      const author = await getAuthorDetails(id);
      authors.push({ id, name: author.name, available: true });
    } catch {
      authors.push({ id, name: `Author record ${id}`, available: false });
    }
  }
  const coverId = work.covers?.find((id) => id > 0);
  const description = textValue(work.description);
  const yearText = work.first_publish_date?.match(/\b\d{4}\b/)?.[0];
  const book = { id: workId, title: work.title, authors: authors.filter((author) => author.available).map((author) => author.name), coverId, ...(yearText ? { year: Number(yearText) } : {}) };

  return <><Link href="/search" className="mt-[30px] inline-flex items-center gap-2 text-sm text-[#646b62] hover:text-[#174e3b] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]"><ArrowLeft size={16} aria-hidden="true" />Back to search</Link><article className="flex flex-col gap-[35px] pt-[30px] min-[561px]:grid min-[561px]:grid-cols-[220px_minmax(0,1fr)] min-[561px]:gap-[25px] min-[761px]:grid-cols-[250px_minmax(0,1fr)] min-[761px]:gap-[38px] min-[1101px]:grid-cols-[280px_minmax(0,1fr)] min-[1101px]:gap-16"><aside className="w-[min(100%,270px)] min-w-0 self-center min-[561px]:w-auto min-[561px]:self-auto"><div className="rounded-lg border border-[#e0e2d8] bg-[#eeeae0] p-7"><BookCover key={coverId} coverId={coverId} title={work.title} large /></div><SaveButton book={book} /><a className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3 w-full" href={`https://openlibrary.org/works/${encodeURIComponent(workId)}`} target="_blank" rel="noreferrer">View on Open Library<ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a><p className="mt-3 text-center text-xs leading-relaxed text-[#646b62]">Explore reading or borrowing options there. Availability varies by edition.</p></aside><div className="min-w-0"><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">BOOK DETAILS</p><h1 className="break-words text-[clamp(2.4rem,4vw,3.6rem)] font-bold leading-[1.2] tracking-[-.025em] max-[760px]:text-[2.3rem] max-[560px]:text-[2.6rem]">{work.title}</h1><div className="mt-5 text-[#646b62]">By {authors.length ? authors.map((author, index) => <span key={author.id}>{index > 0 && ", "}<Link href={authorPath(author.id)} prefetch={false} className="inline-flex items-center gap-[7px] text-sm font-semibold text-[#174e3b] underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]">{author.name}</Link></span>) : "author unavailable"}</div>{authorIds.length > 5 && <p className="text-sm text-[#646b62]">Showing the first five author records. See all contributors on Open Library.</p>}{authors.some((author) => !author.available) && <p className="text-sm text-[#646b62]">Some author names could not be loaded. Their record links are still available.</p>}<div className="flex flex-wrap gap-[30px] border-b border-[#e0e2d8] py-[25px] min-[561px]:gap-[45px]"><div><span className="mb-1.5 block text-xs text-[#646b62]">First published</span><strong className="text-sm font-medium">{work.first_publish_date || "Not available"}</strong></div><div><span className="mb-1.5 block text-xs text-[#646b62]">Work ID</span><strong className="text-sm font-medium">{workId}</strong></div></div><section className="mt-[30px]"><h2 className="mb-[18px] text-[1.6rem] font-bold leading-[1.2] tracking-[-.025em]">About this book</h2><p className="whitespace-pre-line break-words leading-[1.85] text-[#565f54]">{description || "A description is not available for this book yet. You can explore its record on Open Library."}</p></section><section className="mt-[30px]"><h2 className="mb-[18px] text-[1.6rem] font-bold leading-[1.2] tracking-[-.025em]">Explore its subjects</h2>{work.subjects?.length ? <div className="flex flex-wrap gap-[9px]">{work.subjects.slice(0, 18).map((subject) => <Link href={subjectPath(subject)} key={subject} prefetch={false} className="max-w-full break-words rounded-[5px] border border-[#e0e2d8] bg-[#f0f2ea] px-[11px] py-1.5 text-[.8125rem] hover:border-[#174e3b] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]">{subject}</Link>)}</div> : <p className="text-[#646b62]">No subjects are listed for this book.</p>}</section></div></article></>;
}
