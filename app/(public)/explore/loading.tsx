import { Skeleton } from "@/components/ui/skeleton";

export default function ExploreLoading() {
  return (
    <div className="py-5 flex flex-col gap-5">
      <div className="w-full flex flex-col items-center gap-2.5">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      <Skeleton className="h-[400px] w-full rounded-xl" />

      <div className="flex flex-col gap-3 mt-1">
        <Skeleton className="h-8 w-56" />
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
