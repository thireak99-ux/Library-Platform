"use client";

import { useContext, useState } from "react";
import { Trash2 } from "lucide-react";
import { LibraryContext } from "@/components/library-provider";
import { BookCard } from "@/components/book-card";
import { EmptyState } from "@/components/empty-state";
import { BooksSkeleton } from "@/components/books-skeleton";
import { Button } from "@/components/ui/button";
import { READING_STATUSES } from "@/lib/storage";
import type { ReadingStatus } from "@/types";

export function SavedLibrary() {
  const { books, loaded, error, changeStatus, removeBook } = useContext(LibraryContext);
  const [filter, setFilter] = useState("All books");
  const [announcement, setAnnouncement] = useState("");
  const visibleBooks = filter === "All books" ? books : books.filter((book) => book.status === filter);

  if (!loaded) return error ? <div className="my-5 flex flex-col items-start justify-between gap-5 rounded-[7px] border border-[#e6dbc5] bg-[#f5f0e5] p-[25px] min-[561px]:flex-row min-[561px]:items-center" role="alert"><p>{error}</p><Button onClick={() => window.location.reload()}>Try again</Button></div> : <BooksSkeleton />;

  return <>
    {error && <p className="my-5 flex flex-col items-start justify-between gap-5 rounded-[7px] border border-[#e6dbc5] bg-[#f5f0e5] p-[25px] min-[561px]:flex-row min-[561px]:items-center" role="alert">{error}</p>}
    <div className="mb-8 flex flex-col items-start justify-between gap-5 border-y border-[#e0e2d8] py-5 min-[761px]:flex-row min-[761px]:items-center"><div className="flex flex-wrap gap-[7px]" aria-label="Filter saved books">{["All books", ...READING_STATUSES].map((status) => <button key={status} className={filter === status ? "inline-flex items-center gap-[9px] rounded-[5px] border border-transparent bg-[#174e3b] px-3 py-2 text-sm text-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] max-[560px]:px-[9px] max-[560px]:text-[.8125rem]" : "inline-flex items-center gap-[9px] rounded-[5px] border border-transparent bg-transparent px-3 py-2 text-sm hover:bg-[#efeee7] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557] max-[560px]:px-[9px] max-[560px]:text-[.8125rem]"} aria-pressed={filter === status} onClick={() => setFilter(status)}>{status}<span className="text-xs opacity-80">{status === "All books" ? books.length : books.filter((book) => book.status === status).length}</span></button>)}</div><p className="text-sm text-[#646b62]">{books.length} saved {books.length === 1 ? "book" : "books"}</p></div>
    <p className="sr-only" role="status">{announcement}</p>
    {visibleBooks.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-[26px] min-[561px]:grid-cols-3 min-[561px]:gap-y-[22px] min-[761px]:grid-cols-4 min-[761px]:gap-x-[22px] min-[1101px]:grid-cols-6 min-[1101px]:gap-[23px]">{visibleBooks.map((book) => <article key={book.id} ><BookCard book={book} /><div className="mt-[15px] border-t border-[#e0e2d8] pt-3.5"><label className="mb-1.5 block text-xs text-[#646b62]" htmlFor={`status-${book.id}`}>Reading status</label><select className="min-h-10 w-full cursor-pointer rounded-[5px] border border-[#e0e2d8] bg-white p-2 text-[.8125rem] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#367557]" id={`status-${book.id}`} value={book.status} onChange={(event) => changeStatus(book.id, event.target.value as ReadingStatus)}>{READING_STATUSES.map((status) => <option key={status}>{status}</option>)}</select><button className="inline-flex items-center gap-1.5 pt-3 text-xs text-[#79594d] hover:text-[#a23a20] hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#367557]" aria-label={`Remove ${book.title}`} onClick={() => { removeBook(book.id); setAnnouncement(`Remove action requested for ${book.title}.`); }}><Trash2 size={14} aria-hidden="true" />Remove</button></div></article>)}</div> : <EmptyState title={books.length ? "No books on this shelf yet" : "Your next chapter starts here"} message={books.length ? "Change a book’s reading status to move it to this shelf." : "Find a book you love and save it here. Your reading list stays in this browser."} />}
  </>;
}
