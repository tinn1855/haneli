import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function CTAButton({ href, children, className }: CTAButtonProps) {
  return (
    <div className={className}>
      <Button asChild variant="luxury" size="xl">
        <Link href={href}>
          {children}
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </Button>
    </div>
  );
}

