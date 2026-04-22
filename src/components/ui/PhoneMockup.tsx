import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneMockupProps {
  label?: string;
  className?: string;
  glow?: boolean;
  image?: string;
  alt?: string;
}

export function PhoneMockup({ label, className, glow = false, image, alt }: PhoneMockupProps) {
  return (
    <div
      className={cn(
        "relative mx-auto",
        glow && "after:absolute after:inset-0 after:-z-10 after:rounded-[3rem] after:blur-3xl after:bg-primary/30",
        className,
      )}
      style={{ aspectRatio: "9 / 19.5" }}
    >
      <div className="relative h-full w-full rounded-[2.5rem] bg-muted border border-border shadow-lift overflow-hidden flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={alt ?? label ?? "App screenshot"}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-24 bg-foreground rounded-full" />
            <div className="flex flex-col items-center gap-3 text-muted-foreground px-6 text-center">
              <Camera className="h-12 w-12" strokeWidth={1.5} />
              {label && <span className="text-sm font-medium">{label}</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
