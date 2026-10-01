import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PAGE_SIZE } from "@/lib/open-library";

export function Pagination({ page, total, pathname, query }: { page: number; total: number; pathname: string; query?: string }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages === 1 && page === 1) return null;
  function href(nextPage: number) {
    const params = new URLSearchParams({ page: String(nextPage) });
    if (query) params.set("q", query);
    return `${pathname}?${params}`;
  }
  return <nav aria-label="Results pagination" className="mt-[30px] flex items-center justify-center gap-3 border-t border-[#e0e2d8] pt-[35px] min-[561px]:gap-[30px]">
    {page > 1 ? <Link href={href(Math.min(page - 1, pages))} prefetch={false} className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3"><ArrowLeft size={16} aria-hidden="true" />Previous</Link> : <span className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3" aria-disabled="true"><ArrowLeft size={16} aria-hidden="true" />Previous</span>}
    <span className="text-center text-xs text-[#646b62] min-[561px]:text-sm">Page {page.toLocaleString()} of {pages.toLocaleString()}</span>
    {page < pages ? <Link href={href(page + 1)} prefetch={false} className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3">Next<ArrowRight size={16} aria-hidden="true" /></Link> : <span className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3" aria-disabled="true">Next<ArrowRight size={16} aria-hidden="true" /></span>}
  </nav>;
}
