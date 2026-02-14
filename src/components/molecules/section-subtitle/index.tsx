import { Subtitle } from "@/components/ui/subtitle";

interface SectionSubtitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionSubtitle({
  children,
  className,
}: SectionSubtitleProps) {
  return (
    <Subtitle variant="default" className={className}>
      {children}
    </Subtitle>
  );
}

