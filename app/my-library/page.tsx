import type { Metadata } from "next";
import { Monitor } from "lucide-react";
import { SavedLibrary } from "@/components/saved-library";

export const metadata: Metadata = {
  title: "My Library",
  description: "Organize your saved books and reading progress in this browser.",
  robots: { index: false, follow: true },
};

export default function MyLibraryPage() {
  return <><div className="pt-8 pb-[30px] min-[561px]:pt-11"><p className="mb-3 text-[.6875rem] font-extrabold leading-normal tracking-[.15em] text-[#174e3b]">YOUR PERSONAL BOOKSHELF</p><h1 className="text-5xl font-bold leading-[1.2] tracking-[-.025em] max-[560px]:text-[2.45rem]">My Library</h1><p className="mt-[15px] text-[#646b62]">Stories to start. Pages in progress. Books to remember.</p><span className="mt-[22px] flex items-center gap-2 text-[.8125rem] text-[#646b62]"><Monitor size={16} aria-hidden="true" />Saved in this browser · Clearing browser data removes this library.</span></div><SavedLibrary /></>;
}
