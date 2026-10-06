import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-[680px] py-[60px] text-center min-[561px]:py-[90px]">
      <BookOpen
        className="mx-auto mb-[25px] text-[#174e3b]"
        size={42}
        strokeWidth={1}
        aria-hidden="true"
      />
      <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">
        404 · A MISSING PAGE
      </p>
      <h1 className="text-5xl font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.4rem]">
        This page isn’t on the shelf.
      </h1>
      <p className="my-[22px] mb-[30px] text-[#646b62]">
        The page, book, or author you’re looking for could not be found.
        <br />
        Let’s find your way to another story.
      </p>
      <Link
        href="/"
        className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#174e3b] bg-[#174e3b] px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-white transition-colors hover:bg-[#103f2e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        Back to homepage
      </Link>
    </section>
  );
}
