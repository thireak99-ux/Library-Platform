import type { TextValue } from "@/types";

export function normalizeId(value: string) {
  return value.split("/").filter(Boolean).pop() ?? "";
}

export function textValue(value?: TextValue) {
  if (typeof value === "string") return value;
  return value?.value ?? "";
}

export function getPage(value?: string | string[]) {
  const number = Number(Array.isArray(value) ? value[0] : value);
  return Number.isSafeInteger(number) && number > 0 ? number : 1;
}

export function subjectPath(subject: string) {
  return `/subjects/${encodeURIComponent(subject.trim().toLowerCase().replace(/\s+/g, "_"))}`;
}

export function bookPath(id: string) {
  return `/books/${encodeURIComponent(normalizeId(id))}`;
}

export function authorPath(id: string) {
  return `/authors/${encodeURIComponent(normalizeId(id))}`;
}
