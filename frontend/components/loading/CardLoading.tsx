import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div className="flex flex-col space-y-3 w-full h-full">
      <Skeleton className={cn("h-44 w-sm rounded-xl", className)} />
    </div>
  );
}
