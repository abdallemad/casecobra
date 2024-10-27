import {
  COLORS,
  MODEL,
  FINISHES,
  MATERIALS,
} from "@/validator/options-validator";
import { Dispatch, SetStateAction } from "react";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "../ui/button";
type ModelProps = {
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
export default function Model({ options, setOptions }: ModelProps) {
  return (
    <>
      <Label>Model</Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"outline"}
            role="combobox"
            className="w-full justify-between"
          >
            <>
              {options.model.label}
              <ChevronsUpDownIcon className="w-4 h-4 shrink-0 ml-2 opacity-50" />
            </>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-full" align="start">
          {MODEL.options.map((model, i) => {
            const isChecked = model.value === options.model.value;
            return (
              <DropdownMenuItem
                key={i}
                className={cn(
                  "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                  {
                    "bg-zinc-100": isChecked,
                  }
                )}
                onClick={() => {
                  setOptions((prev) => {
                    return {
                      ...prev,
                      model,
                    };
                  });
                }}
              >
                <>
                  {
                    <Check
                      className={cn("w-4 h-4 mr-2 opacity-0", {
                        "opacity-100": isChecked,
                      })}
                    />
                  }
                  {model.label}
                </>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
