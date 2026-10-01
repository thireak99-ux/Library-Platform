import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Logo() {
  return <Link href="/" className="inline-flex shrink-0 items-center whitespace-nowrap text-[1.45rem] font-extrabold leading-none tracking-[-.045em] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] min-[561px]:text-[1.65rem]" aria-label="LibriHub home"><span className="mr-[7px] grid size-8 place-items-center rounded-[7px] bg-[#174e3b] text-white min-[561px]:mr-2.5 min-[561px]:size-[37px]"><BookOpen size={21} aria-hidden="true" /></span>LibriHub<span className="text-[#174e3b]">.</span></Link>;
}
