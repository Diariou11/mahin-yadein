import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const LoadingCard = () => {
  return (
    <Card className="p-4 animate-fade-in">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="w-8 h-8 rounded-full" />
      </div>
      
      <Skeleton className="h-4 w-full mb-3" />
      
      <div className="flex gap-2 mb-3">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-32 rounded-full" />
      </div>
      
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-8 w-32" />
      </div>
    </Card>
  );
};
