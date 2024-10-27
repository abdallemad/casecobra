"use client";
import React, { useEffect, useRef, useState } from "react";
import { Color } from "@prisma/client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import Image from "next/image";
import { COLORS } from "@/validator/options-validator";
import { cn } from "@/lib/utils";
import clearPhone from "@/assets/clearphone.png";

export default function PhonePreview({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: Color;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handelResize = () => {
    if (!ref.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimensions({ width, height });
  };
  useEffect(() => {
    handelResize();
    window.addEventListener("resize", handelResize);

    return () => window.removeEventListener("resize", handelResize);
  }, [ref.current]);

  let caseBackgroundColor: string = COLORS[0].tw.bg;
  if (color == "blue") caseBackgroundColor = COLORS[1].tw.bg;
  if (color == "rose") caseBackgroundColor = COLORS[2].tw.bg;

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352] "
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <div className="relative h-full">
          <img
            src={croppedImageUrl}
            alt="user image"
            className={cn(
              "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
              caseBackgroundColor
            )}
            width={renderedDimensions.width / (3000 / 637)}
          />
        </div>
      </div>
      <div className="relative h-full w-full z-40">
        <Image
          width={400}
          height={800}
          alt="phone"
          src={clearPhone.src}
          className="pointer-events-none h-full w-full antialiased rounded-md"
        />
      </div>
    </AspectRatio>
  );
}
