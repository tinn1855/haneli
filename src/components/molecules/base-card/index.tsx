import Link from "next/link";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface BaseCardProps {
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export function BaseCard({ href, className, children, onClick }: BaseCardProps) {
  const cardClassName = cn(
    "group relative flex h-full flex-col rounded-none border border-border/50 bg-background transition-all duration-500 hover:border-foreground/50 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        <Card className={cn("h-full border-0 shadow-none p-0", cardClassName)}>
          {children}
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn("h-full border-0 shadow-none p-0", cardClassName)} onClick={onClick}>
      {children}
    </Card>
  );
}

