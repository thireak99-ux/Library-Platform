import { Skeleton } from "@/components/ui/skeleton";

export function BooksSkeleton() {
  return <div role="status" aria-label="Loading books"><span className="sr-only">Loading books…</span><div className="grid grid-cols-2 gap-x-4 gap-y-[26px] min-[561px]:grid-cols-3 min-[561px]:gap-y-[22px] min-[761px]:grid-cols-4 min-[761px]:gap-x-[22px] min-[1101px]:grid-cols-6 min-[1101px]:gap-[23px]">{Array.from({ length: 6 }, (_, index) => <div key={index} className="space-y-4"><Skeleton className="aspect-[3/4] rounded-md" /><Skeleton className="h-5 w-4/5" /><Skeleton className="h-4 w-3/5" /></div>)}</div></div>;
}
