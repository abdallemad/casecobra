"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrderStatus } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { Check, ChevronsUpDownIcon } from "lucide-react";
import changeOrderStatusAction from "./action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
const LABEL_MAP: Record<keyof typeof OrderStatus, string> = {
  waiting_shipment: "Awaiting Shipment",
  fulfilld: "Fulfilled",
  shipped: "Shipped",
};

export default function StatusDropdown({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: OrderStatus;
}) {
  const router = useRouter()
  const {toast} = useToast()
  const { mutate: changeOrderStatus } = useMutation({
    mutationKey: ["change-order-status"],
    mutationFn: changeOrderStatusAction,
    onSuccess:()=>{
      toast({
        description:'order updated successfully.'
      })
      router.refresh()
    }
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"outline"}
          className="w-52 flex justify-between items-center"
        >
          {LABEL_MAP[orderStatus]}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        {Object.keys(OrderStatus).map((st) => {
          return (
            <DropdownMenuItem
              key={st}
              className={cn(
                "flex text-sm gap-1 items-center p-2.5 cursor-default hover:bg-zinc-100",
                {
                  "bg-zinc-100": orderStatus === st,
                }
              )}
              onClick={()=>changeOrderStatus({id,newOrderStatus:st as OrderStatus})}
            >
              <Check
                className={cn("mr-2 h-4 w-4 text-primary opacity-0", {
                  "opacity-100": orderStatus === st,
                })}
              />
              {LABEL_MAP[st as OrderStatus]}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
