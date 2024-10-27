"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import Review from "./Review";
export default function ReviewColumn({
  reviews,
  className,
  reviewClassName,
  msPerPixel,
}: {
  reviews: string[];
  className?: string;
  reviewClassName?: (reviewIndex: number) => string;
  msPerPixel: number;
}) {
  const columnRef = useRef<HTMLDivElement | null>(null);
  const [columnHeight, setColumnHeight] = useState<number>(0);
  const duration = `${columnHeight * msPerPixel}ms`;

  useEffect(() => {
    if (!columnRef.current) return;
    const resizeObserver = new ResizeObserver(() => {
      setColumnHeight(columnRef.current?.offsetHeight ?? 0);
    });
    resizeObserver.observe(columnRef.current, {});
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={columnRef}
      className={cn("animate-marquee space-y-8 px-8 sm:px-0 py-8", className)}
      style={{ "--marquee-duration": duration } as React.CSSProperties}
    >
      {reviews.concat(reviews).map((imgSrc, reviewIndex) => (
        <Review
          imgSrc={imgSrc}
          key={reviewIndex}
          className={reviewClassName?.(reviewIndex % reviews.length)}
        />
      ))}
    </div>
  );
}
