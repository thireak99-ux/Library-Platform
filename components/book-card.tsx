import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BookCover } from "@/components/book-cover";
import { Card } from "@/components/ui/card";
import { bookPath } from "@/lib/format";
import type { Book } from "@/types";

export function BookCard({ book }: { book: Book }) {
  return (
    <Card className="min-w-0 rounded-[5px] border-0 bg-transparent shadow-none dark:text-[#f1f5ef] nth-[3n+2]:[&>a>div:first-child]:bg-[#eceee8] nth-[3n]:[&>a>div:first-child]:bg-[#f0ebe3] dark:[&>a>div:first-child]:!bg-[#26382d]">
      <Link
        href={bookPath(book.id)}
        prefetch={false}
        className="group block h-full rounded-[5px] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]"
        aria-label={`View ${book.title}`}
      >
        <div className="rounded-[5px] border border-[#e7e7df] bg-[#eeeee7] px-[17px] py-5 transition-colors group-hover:!bg-[#e2e9dc] dark:border-[#405747] dark:group-hover:!bg-[#314838] max-[560px]:px-3.5 max-[560px]:py-[18px]">
          <BookCover coverId={book.coverId} title={book.title} />
        </div>

        <div className="pt-3.5">
          <h3 className="line-clamp-2 text-base font-bold leading-[1.4]">
            {book.title}
          </h3>

          <p className="mt-[5px] truncate text-[.8125rem] leading-normal text-[#646b62] dark:text-[#c6d1c7]">
            {book.authors.length
              ? book.authors.join(", ")
              : "Author unavailable"}
          </p>

          <div className="mt-[9px] flex justify-between text-xs text-[#646b62] dark:text-[#c6d1c7]">
            <span>{book.year ?? "Year unavailable"}</span>
            <ArrowUpRight
              className="text-[#174e3b] dark:text-[#b2dec0]"
              size={16}
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </Card>
  );
}