"use client";

import { createContext, useState, useEffect, type ReactNode } from "react";
import { readSavedBooks, STORAGE_KEY } from "@/lib/storage";
import type { Book, ReadingStatus, SavedBook } from "@/types";

export const LibraryContext = createContext<{
  books: SavedBook[];
  loaded: boolean;
  error: string;
  saveBook: (book: Book) => void;
  changeStatus: (id: string, status: ReadingStatus) => void;
  removeBook: (id: string) => void;
}>({ books: [], loaded: false, error: "", saveBook: () => {}, changeStatus: () => {}, removeBook: () => {} });

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<SavedBook[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function load() {
      try {
        setBooks(readSavedBooks());
        setError("");
        setLoaded(true);
      } catch {
        setLoaded(false);
        setError("Your saved library could not be read. Enable browser storage, or check the saved data in this browser. Existing data has not been overwritten.");
      }
    }
    load();
    function handleStorage(event: StorageEvent) {
      if (event.key === STORAGE_KEY || event.key === null) load();
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function writeBooks(updated: SavedBook[]) {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setBooks(updated);
      setError("");
    } catch {
      setError("This change could not be saved. Browser storage may be full or disabled. Please try again.");
    }
  }

  function saveBook(book: Book) {
    if (!loaded || books.some((item) => item.id === book.id)) return;
    writeBooks([...books, { ...book, status: "Want to Read" }]);
  }

  function changeStatus(id: string, status: ReadingStatus) {
    writeBooks(books.map((book) => book.id === id ? { ...book, status } : book));
  }

  function removeBook(id: string) {
    writeBooks(books.filter((book) => book.id !== id));
  }

  return <LibraryContext.Provider value={{ books, loaded, error, saveBook, changeStatus, removeBook }}>{children}</LibraryContext.Provider>;
}
