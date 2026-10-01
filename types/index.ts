export type Book = {
  id: string;
  title: string;
  authors: string[];
  coverId?: number;
  year?: number;
};

export type ReadingStatus = "Want to Read" | "Reading" | "Finished";

export type SavedBook = Book & { status: ReadingStatus };

export type TextValue = string | { value?: string };

export type WorkRecord = {
  key: string;
  title: string;
  description?: TextValue;
  covers?: number[];
  subjects?: string[];
  first_publish_date?: string;
  authors?: { author?: { key: string } }[];
};

export type AuthorRecord = {
  key: string;
  name: string;
  bio?: TextValue;
  birth_date?: string;
  death_date?: string;
};

export type SearchBook = {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
};

export type SubjectBook = {
  key: string;
  title: string;
  authors?: { name?: string; key: string }[];
  cover_id?: number;
  first_publish_year?: number;
};
