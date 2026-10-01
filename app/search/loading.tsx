import { BooksSkeleton } from "@/components/books-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <div className="py-12"><Skeleton className="mb-4 h-4 w-32" /><Skeleton className="mb-12 h-10 w-3/5" /><BooksSkeleton /></div>;
}
