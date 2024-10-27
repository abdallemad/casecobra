"use client";
import phoneTemplate from "@/assets/phone-template.png";
import NextImage from "next/image";
import { cn } from "@/lib/utils";
import { Rnd } from "react-rnd";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import HandleComponent from "@/components/HandleComponent";
import { useRef, RefObject, Dispatch, SetStateAction } from "react";

function PhoneModel({
  imageUrl,
  bgColor,
  imageDimensions,
  phoneCaseRef,
  setRenderDimensions,
  setRenderedPosition,
}: {
  imageUrl: string;
  bgColor: string;
  imageDimensions: {
    width: number;
    height: number;
  };
  phoneCaseRef: RefObject<HTMLDivElement>;
  setRenderedPosition: Dispatch<
    SetStateAction<{
      x: number;
      y: number;
    }>
  >;
  setRenderDimensions: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
}) {
  return (
    <>
      <div className="relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]">
        <AspectRatio
          ref={phoneCaseRef}
          ratio={896 / 1831}
          className="pointer-events-none aspect-[896/1831] relative z-50"
        >
          <NextImage
            alt="phone template"
            src={phoneTemplate.src}
            fill
            className="pointer-events-none z-50 select-none"
          />
        </AspectRatio>
        {/* drop down shadow. */}
        <div className="absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]" />
        {/* Color of the case */}
        <div
          className={cn(
            "absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]",
            `${bgColor} `
          )}
        />
      </div>
      <Rnd
        default={{
          x: 150,
          y: 205,
          height: imageDimensions.height / 3,
          width: imageDimensions.width / 3,
        }}
        lockAspectRatio
        resizeHandleComponent={{
          topLeft: <HandleComponent />,
          topRight: <HandleComponent />,
          bottomLeft: <HandleComponent />,
          bottomRight: <HandleComponent />,
        }}
        className="absolute z-20 border-[3px] border-primary"
        onResizeStop={(_, _1, ref, __, { x, y }) => {
          setRenderDimensions({
            width: parseInt(ref.style.width.slice(0, -2)),
            height: parseInt(ref.style.height.slice(0, -2)),
          });
          setRenderedPosition({ x, y });
        }}
        onDragStop={(_, data) => {
          const { x, y } = data;
          setRenderedPosition({ x, y });
        }}
      >
        <div className="relative w-full h-full">
          <NextImage
            src={imageUrl}
            alt="your image"
            fill
            className="pointer-events-none"
          />
        </div>
      </Rnd>
    </>
  );
}

export default PhoneModel;
