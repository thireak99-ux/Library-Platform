import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { BookGrid } from "@/components/book-grid";
import { EmptyState } from "@/components/empty-state";
import { Pagination } from "@/components/pagination";
import { getSubjectBooks } from "@/lib/open-library";
import { getPage, subjectPath } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const name = subject.replaceAll("_", " ");
  const title = `${name} books`;
  const description = `Browse ${name} books and find your next read on LibriHub.`;
  return {
    title,
    description,
    openGraph: { title: `${title} | LibriHub`, description },
  };
}

export default async function SubjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ subject: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { subject } = await params;
  if (!subject.trim() || subject.length > 200 || /[\/\x00-\x1f]/.test(subject))
    notFound();
  const page = getPage((await searchParams).page);
  const result = await getSubjectBooks(subject, page);
  const name = result.name || subject.replaceAll("_", " ");

  return (
    <>
      <Link
        href="/#subjects"
        className="mt-[30px] inline-flex items-center gap-2 text-sm text-[#646b62] hover:text-[#174e3b] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        All subjects
      </Link>
      <div className="pt-8 pb-[30px] min-[561px]:pt-11 mb-5 pt-7">
        <p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">
          EXPLORE A SUBJECT
        </p>
        <h1 className="break-words text-5xl font-bold leading-[1.2] tracking-[-.025em] capitalize max-[560px]:text-[2.45rem]">
          {name}
        </h1>
        <p className="mt-[15px] text-[#646b62]">
          Follow your curiosity, one book at a time.
        </p>
        <span className="mt-5 inline-block rounded-[5px] border border-[#dce5d2] bg-[#eaf0e3] px-[11px] py-[5px] text-[.8125rem] text-[#174e3b]">
          {result.total.toLocaleString()}{" "}
          {result.total === 1 ? "book" : "books"} in the catalog
        </span>
      </div>
      {result.books.length ? (
        <BookGrid books={result.books} />
      ) : (
        <EmptyState
          title={
            result.total
              ? "No books on this page"
              : "No books in this subject yet"
          }
          message={
            result.total
              ? "Return to the first page of this subject."
              : "Try a different subject to continue exploring."
          }
          href={result.total ? subjectPath(subject) : "/#subjects"}
          label={result.total ? "Go to page 1" : "Browse subjects"}
        />
      )}
      <Pagination
        page={page}
        total={result.total}
        pathname={subjectPath(subject)}
      />
    </>
  );
}
