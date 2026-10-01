import { Search, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchForm({ query = "" }: { query?: string }) {
  return (
    <form action="/search" method="get" role="search" className="relative flex max-w-[760px] items-center gap-2 rounded-lg border border-[#cbd3c7] bg-white p-[7px] shadow-[0_3px_10px_#203d2310] max-[560px]:gap-0.5 max-[560px]:p-[5px]">
      <label className="sr-only" htmlFor="book-search">Search books by title, author, or keyword</label>
      <Search className="ml-3 shrink-0 text-[#646b62] max-[560px]:ml-1.5 max-[560px]:w-[17px]" size={21} aria-hidden="true" />
      <Input id="book-search" name="q" defaultValue={query} key={query} placeholder="Search by title, author, or keyword…" maxLength={200} type="search" className="h-[42px] min-w-0 flex-1 border-0 bg-transparent pr-0 pl-2 text-[.9375rem] shadow-none focus-visible:shadow-none focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-[#367557] max-[560px]:pl-1.5 max-[560px]:text-sm" />
      <input type="hidden" name="page" value="1" />
      <Button className="shrink-0 [&_svg]:max-[560px]:hidden" type="submit">Search<ArrowRight size={17} aria-hidden="true" /></Button>
    </form>
  );
}
