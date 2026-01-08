import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Feedback } from "@/types/feedback";

interface FeedbackCardProps {
  feedback: Feedback;
  className?: string;
}

export function FeedbackCard({ feedback, className }: FeedbackCardProps) {
  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col rounded-none border border-border/50 bg-background p-8 transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
        className
      )}
    >
      <div className="mb-8 flex-1">
        <p className="text-base font-light leading-relaxed tracking-wide text-foreground">
          {feedback.comment}
        </p>
      </div>

      <div className="flex items-center gap-4 border-t border-border/50 pt-6">
        {feedback.avatar ? (
          <div className="relative size-12 overflow-hidden border border-border/30 transition-all duration-500 group-hover:border-foreground/50">
            <Image
              src={feedback.avatar}
              alt={feedback.customerName}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
        ) : (
          <div className="flex size-12 items-center justify-center border border-border/50 bg-muted/30 text-sm font-light tracking-wide text-foreground transition-all duration-500 group-hover:border-foreground/50">
            {feedback.customerName.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-light tracking-wide text-foreground">
            {feedback.customerName}
          </p>
          {feedback.customerRole && (
            <p className="text-xs font-light tracking-wide text-muted-foreground">
              {feedback.customerRole}
            </p>
          )}
        </div>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5 transition-colors duration-300",
                i < feedback.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-foreground/10"
              )}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}

