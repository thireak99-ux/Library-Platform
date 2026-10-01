import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn("inline-flex min-h-11 cursor-pointer items-center justify-center gap-[9px] rounded-md border border-[#174e3b] bg-[#174e3b] px-[18px] py-2.5 text-sm font-semibold leading-[1.4] text-white transition-colors hover:bg-[#103f2e] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] disabled:pointer-events-none disabled:opacity-50 max-[560px]:px-3", className)} {...props} />;
}
