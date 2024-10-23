'use client';
import type { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";
import snakeImage from "@/assets/snake-1.png";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

export default function LoginModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  console.log(isOpen)
  return (
    <Dialog open={isOpen} defaultOpen={false} onOpenChange={setIsOpen}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="z-[999999]">
        <DialogHeader>
          <div className="relative mx-auto w-24 h-24 mb-2">
            <Image
              src={snakeImage.src}
              alt="snake image"
              className="object-contain"
              fill
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight">Log in to continue</DialogTitle>
          <DialogDescription className="text-base text-center py-2">
            <span className="font-medium text-zinc-900 ">Your configuration is saved! </span>Please login or create an account to complete your purchase.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <Button asChild variant={'outline'}>
            <LoginLink >Login</LoginLink>
          </Button>
          <Button asChild>
            <RegisterLink >Register</RegisterLink>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
