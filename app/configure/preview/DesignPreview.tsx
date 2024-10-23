"use client";
import WebsiteFeatures from "@/components/landing-page/WebsiteFeatures";
import Phone from "@/components/Phone";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BASE_PRICE } from "@/config/product";
import { cn, formatPrice } from "@/lib/utils";
import {
  COLORS,
  FINISHES,
  MATERIALS,
  MODEL,
} from "@/validator/options-validator";
import { Configuration } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { createCheckOutSession } from "./action";
import Confetti from "react-dom-confetti";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import LoginModal from "@/components/LoginModal";
const CONFIG = {
  angle: 87,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#f00", "#0f0", "#00f"],
};
export default function DesignPreview({
  configuration,
}: {
  configuration: Configuration;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useKindeBrowserClient();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  useEffect(() => setShowConfetti(true), []);
  const model = MODEL.options.find(
    (modelOption) => modelOption.value == configuration.model
  )!;
  const finish = FINISHES.options.find(
    (modelOption) => modelOption.value == configuration.finish
  )!;
  const material = MATERIALS.options.find(
    (modelOption) => modelOption.value == configuration.material
  )!;
  const tw = COLORS.find(
    (colorOption) => colorOption.value === configuration.color
  )!.tw;
  
  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckOutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("un able to");
    },
    onError: () => {
      toast({
        title: "some thing went wrong",
        description: "there was an error on our end ",
        variant: "destructive",
      });
    },
  });
  
  const handelCheckout = () => {
    if (user) {
      createPaymentSession({ configId: configuration.id });
      console.log('if statement')
    } else {
      localStorage.setItem("configurationId", configuration.id);
      setIsOpen(true);
      console.log('else statement')
    }
  };
  return (
    <>
      <LoginModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
        aria-hidden
      >
        <Confetti active={showConfetti} config={CONFIG} />
      </div>
      <div className="mt-20 grid text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        {/* PHONE */}
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2 ">
          <Phone
            imgSrc={configuration.croppedImageUrl!}
            className={cn(tw?.bg, "max-w-[70dvh] mx-auto")}
          />
        </div>
        {/* INFO */}
        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your: {model.label} Case
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <WebsiteFeatures
              features={["In stock and ready to ship"]}
              className="text-gray-500"
            />
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base ">
          <div className="grid gap-y-8 border-b border-gray-200 by-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">HightLights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU chock absorption</li>
                <li>Page made from recycle material</li>
                <li>5 years print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality durable material</li>
                <li>Scratch- and fingers resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-600">Base Price: </p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE / 1_00)}
                  </p>
                </div>
                {finish.value == "texture" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Textured Price: </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(finish.price / 100)}
                    </p>
                  </div>
                )}
                {material.value == "polycarbonate" && (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-600">Polycarbonate Price: </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(material.price / 100)}
                    </p>
                  </div>
                )}
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between py-2">
                <p className="text-gray-900 font-semibold">Total:</p>
                <p className="text-zinc-950 font-semibold">
                  {formatPrice(
                    (BASE_PRICE + material.price + finish.price) / 100
                  )}
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                className="px-4 sm:px-6 lg:px-8"
                onClick={handelCheckout}
              >
                <>
                  Checkout <ArrowRight className="w-4 h-4 ml-1.5 inline " />
                </>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
