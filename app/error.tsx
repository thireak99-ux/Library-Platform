"use client";

import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <section className="mx-auto max-w-[680px] py-[60px] text-center min-[561px]:py-[90px]" role="alert"><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">LET’S TRY THAT AGAIN</p><h1 className="text-5xl font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.4rem]">The catalog needs a moment.</h1><p className="my-[22px] mb-[30px] text-[#646b62]">We couldn’t load this page. Open Library may be busy, temporarily unavailable, or limiting requests. Wait a moment, then retry.</p><div className="flex flex-wrap justify-center gap-3"><Button onClick={() => { reset(); window.location.reload(); }}><RefreshCw size={16} aria-hidden="true" />Try again</Button><Link href="/" className="inline-flex min-h-11 items-center justify-center gap-[9px] rounded-md border border-[#e0e2d8] bg-transparent px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-[#174e3b] transition-colors hover:bg-[#e9eee6] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] aria-disabled:pointer-events-none aria-disabled:opacity-50 max-[560px]:px-3">Back to homepage</Link></div></section>;
}
