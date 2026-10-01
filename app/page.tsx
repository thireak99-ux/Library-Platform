import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Bookmark } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import { SubjectLinks } from "@/components/subject-links";
import { BookGrid } from "@/components/book-grid";
import { BooksSkeleton } from "@/components/books-skeleton";
import { RetryNotice } from "@/components/retry-notice";
import { EmptyState } from "@/components/empty-state";
import { getSubjectBooks } from "@/lib/open-library";

export const dynamic = "force-dynamic";

async function DiscoveryBooks() {
  let books;
  try {
    const result = await getSubjectBooks("fiction");
    books = result.books;
  } catch {
    return <RetryNotice />;
  }
  return books.length ? <BookGrid books={books.slice(0, 6)} /> : <EmptyState title="This shelf is quiet today" message="Try browsing another subject to find your next book." />;
}

export default function HomePage() {
  return <>
    <section className="grid grid-cols-1 items-center gap-[30px] border-b border-[#e0e2d8] pt-[34px] pb-8 min-[761px]:grid-cols-[minmax(0,1fr)_230px] min-[761px]:pt-[50px] min-[761px]:pb-11 min-[1101px]:grid-cols-[minmax(0,1fr)_260px] min-[1101px]:gap-[70px]">
      <div ><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">THE OPEN BOOKSHELF</p><h1 className="text-[clamp(2.5rem,4.5vw,3.7rem)] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.7rem]">Find your next <em className="font-normal text-[#174e3b]">chapter.</em></h1><p className="my-[18px] mb-[25px] leading-[1.75] text-[#646b62] max-[560px]:text-[.9375rem]">A familiar favorite or something unexpected.<br className="hidden sm:block" /> Discover books worth getting lost in.</p><SearchForm /><p className="mt-3 text-[.8125rem] text-[#646b62] [&_a]:underline [&_a]:decoration-[#b8c3b4] [&_a]:underline-offset-[3px]">Try <Link href="/search?q=the+hobbit&page=1" prefetch={false}>The Hobbit</Link>, <Link href="/search?q=Jane+Austen&page=1" prefetch={false}>Jane Austen</Link>, or <Link href="/search?q=programming&page=1" prefetch={false}>programming</Link></p></div>
      <Link href="/my-library" className="hidden rounded-[9px] border border-[#dfe6d7] bg-[#edf1e8] p-6 min-[761px]:block"><span className="mb-4 block text-[#174e3b]"><Bookmark size={23} strokeWidth={1.4} aria-hidden="true" /></span><h2 className="text-2xl font-bold leading-[1.2] tracking-[-.025em]">A shelf of your own.</h2><p className="my-3 mb-[18px] text-sm text-[#646b62]">Keep your next reads together, from the first page to the last.</p><span className="flex items-center gap-2 text-sm font-semibold text-[#174e3b]">Visit My Library<ArrowRight size={16} aria-hidden="true" /></span><small className="mt-2 block text-xs text-[#646b62]">Saved in this browser</small></Link>
    </section>
    <section id="subjects" className="mt-[38px]"><div className="mb-[23px] flex items-end justify-between gap-3 min-[561px]:gap-6 max-[560px]:items-center"><div><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">FOLLOW YOUR CURIOSITY</p><h2 className="text-[1.8rem] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[1.55rem]">Browse by subject</h2></div><span className="text-sm text-[#646b62] max-[760px]:hidden">Where will you go next?</span></div><SubjectLinks /></section>
    <section className="mt-[38px] mt-10"><div className="mb-[23px] flex items-end justify-between gap-3 min-[561px]:gap-6 max-[560px]:items-center"><div><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">FROM THE CATALOG</p><h2 className="text-[1.8rem] font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[1.55rem]">Explore the fiction shelf</h2></div><Link className="inline-flex items-center gap-[7px] text-sm font-semibold text-[#174e3b] underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] max-[560px]:text-right max-[560px]:text-xs" href="/subjects/fiction" prefetch={false}>View all fiction<ArrowRight size={16} aria-hidden="true" /></Link></div><Suspense fallback={<BooksSkeleton />}><DiscoveryBooks /></Suspense></section>
  </>;
}
