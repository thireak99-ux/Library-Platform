"use client";

import { useContext } from "react";
import Link from "next/link";
import { Bookmark, Check } from "lucide-react";
import { LibraryContext } from "@/components/library-provider";
import { Button } from "@/components/ui/button";
import type { Book } from "@/types";

export function SaveButton({ book }: { book: Book }) {
  const { books, loaded, error, saveBook } = useContext(LibraryContext);
  const saved = books.some((item) => item.id === book.id);
  return <div className="mt-[22px] mb-[18px] text-center"><Button className="w-full" disabled={!loaded || saved} onClick={() => saveBook(book)}>{saved ? <Check size={18} aria-hidden="true" /> : <Bookmark size={18} aria-hidden="true" />}{saved ? "Saved to My Library" : loaded ? "Save to My Library" : "Loading saved books…"}</Button><p className="mt-2.5 text-sm text-[#646b62]" aria-live="polite">{saved ? <Link href="/my-library" className="inline-flex items-center gap-[7px] text-sm font-semibold text-[#174e3b] underline-offset-4 hover:underline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]">Manage your reading status</Link> : "Saved in this browser. No account needed."}</p>{error && <p role="alert" className="text-sm text-[#9b3d23]">{error}</p>}</div>;
}
