import { BookCard } from "@/components/book-card";
import type { Book } from "@/types";

export function BookGrid({ books }: { books: Book[] }) {
  return <div className="grid grid-cols-2 gap-x-4 gap-y-[26px] min-[561px]:grid-cols-3 min-[561px]:gap-y-[22px] min-[761px]:grid-cols-4 min-[761px]:gap-x-[22px] min-[1101px]:grid-cols-6 min-[1101px]:gap-[23px]">{books.map((book) => <BookCard key={book.id} book={book} />)}</div>;
}
