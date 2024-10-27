"use client";
import {
  COLORS,
  MODEL,
  FINISHES,
  MATERIALS,
} from "@/validator/options-validator";
import { Dispatch, SetStateAction } from "react";
import { RadioGroup, Radio } from "@headlessui/react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

type CaseColorProps = {
  options: {
    color: (typeof COLORS)[number];
    model: (typeof MODEL.options)[number];
    finish: (typeof FINISHES.options)[number];
    material: (typeof MATERIALS.options)[number];
  };
  setOptions: Dispatch<
    SetStateAction<{
      color: (typeof COLORS)[number];
      model: (typeof MODEL.options)[number];
      finish: (typeof FINISHES.options)[number];
      material: (typeof MATERIALS.options)[number];
    }>
  >;
};

export default function CaseColors({ options, setOptions }: CaseColorProps) {
  return (
    <RadioGroup
      value={options.color}
      onChange={(val) => {
        setOptions((prev) => {
          return {
            ...prev,
            color: val,
          };
        });
      }}
    >
      <Label>Color: {options.color.label}</Label>
      <div className="mt-3 flex items-center space-x-3">
        {COLORS.map((color, i) => {
          return (
            <Radio
              key={i}
              value={color}
              className={({ checked, autofocus }) =>
                cn(
                  "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-0 border-2 border-transparent",
                  {
                    [`${color.tw.border}`]: checked,
                    autofocus,
                  }
                )
              }
            >
              <span
                className={cn(
                  `${color.tw.bg} `,
                  "h-8 w-8 rounded-full border border-black border-opacity-10 "
                )}
              ></span>
            </Radio>
          );
        })}
      </div>
    </RadioGroup>
  );
}
