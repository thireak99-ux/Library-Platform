import Link from "next/link";
import { BookOpen } from "lucide-react";

export function EmptyState({
  title,
  message,
  href = "/#subjects",
  label = "Browse subjects",
}: {
  title: string;
  message: string;
  href?: string;
  label?: string;
}) {
  return (
    <div className="mt-7 rounded-lg border border-dashed border-[#d0d8ca] bg-[#f5f6ef] px-6 py-[60px] text-center text-[#252d29] dark:border-[#536b59] dark:bg-[#26382d] dark:text-[#f1f5ef]">
      <span className="mb-5 inline-flex rounded-full bg-[#e5ecde] p-4 text-[#174e3b] dark:bg-[#344c3c] dark:text-[#b2dec0]">
        <BookOpen size={28} strokeWidth={1.5} aria-hidden="true" />
      </span>

      <h2 className="text-[1.85rem] font-bold leading-[1.2] tracking-[-.025em]">
        {title}
      </h2>

      <p className="mx-auto mt-[15px] mb-[22px] max-w-[470px] text-[#646b62] dark:text-[#c6d1c7]">
        {message}
      </p>

      <Link
        href={href}
        className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] dark:border-[#536b59] dark:text-[#b2dec0] dark:hover:bg-[#314838] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3"
      >
        {label}
      </Link>
    </div>
  );
}