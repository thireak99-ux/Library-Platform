"use client";

import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function RetryNotice({ message = "Open Library could not be reached. Please wait a moment, then try again." }: { message?: string }) {
  return <div className="my-5 flex flex-col items-start justify-between gap-5 rounded-[7px] border border-[#e6dbc5] bg-[#f5f0e5] p-[25px] min-[561px]:flex-row min-[561px]:items-center" role="alert"><div><h2 className="mb-2 text-[1.4rem] font-bold leading-[1.2] tracking-[-.025em]">Books are temporarily unavailable</h2><p className="text-sm text-[#695d47]">{message}</p></div><Button className="border-[#e0e2d8] bg-transparent text-[#174e3b] hover:bg-[#e9eee6]" onClick={() => window.location.reload()}><RefreshCw size={16} aria-hidden="true" />Try again</Button></div>;
}
