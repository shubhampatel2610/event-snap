import { Skeleton } from "@/components/ui/skeleton";

export default function EventDetailsLoading() {
  return (
    <div className="min-h-screen px-10 py-8 -mt-6 md:-mt-2">
      <div className="max-w-7xl mx-auto px-5 flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
        </div>

        <Skeleton className="h-60 md:h-70 w-full rounded-2xl" />

        <div className="grid md:grid-cols-[1fr_350px] gap-5">
          <Skeleton className="h-96 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
