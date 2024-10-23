import MaxWidthWrapper from "@/components/MaxWidthWrapper";
// landing image
import snake1 from '@/assets/snake-1.png'
import snake2 from '@/assets/snake-2.png'
import yourImage from '@/assets/your-image.png'
import lineImage from '@/assets/line.png'
import testimonials from '@/assets/testimonials/1.jpg'
import arrow  from '@/assets/arrow.png'
import horse from '@/assets/horse.jpg'
// users 
import Image from "next/image";
import Phone from "@/components/Phone";
import UsersIcons from "@/components/landing-page/UsersIcons";
import WebsiteFeatures from "@/components/landing-page/WebsiteFeatures";
import { Icons } from "@/components/Icons";
import ReviewsContainer from "@/components/landing-page/ReviewsContainer";
import Reviews from "@/components/animated-review/Reviews";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function Home() {
  return (
    <div className="bg-slate-50">
      <section>
        {/* 2cols for title  and one page for phone image  */}
        <MaxWidthWrapper 
          className="pb-24 pt-10 lg:grid lg:grid-cols-3 sm:mb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-22  lg:pb-48">
          <>
          {/* title */}
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div className="relative mx-auto text-center lg:text-left flex flex-col items-center lg:items-start">

              <div className="absolute left-0 -top-14 w-28 hidden lg:block">
                <Image 
                  src={snake1.src} alt="sdk" 
                  width={400} 
                  height={200} 
                  className="w-24"/>
              </div>
              <h1 className="capitalize relative w-fit tracking-tight text-balance  mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                your image on a <span className="bg-green-600 px-2 text-white rounded">custom</span> phone case
              </h1>
              <p className="mt-8 text-lg lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap text-muted-foreground">
                capture your favorite moments with your own, <span className="font-semibold">one of one</span> phone-case. ChaseCobra allows to protect your memories not not just your phone case.
              </p>
              <WebsiteFeatures features={[
                'High-quality, durable material',
                '5 year print guarantee',
                'modern iphone models supported'
              ]}/>
              <UsersIcons />
            </div>
          </div>
          {/* image hidden when screen less sm. */}
          <div 
          className="col-span-full lg:col-span-1 w-full flex justify-center px-8 sm:px-16 md:px-0 mt-32 lg:mx-0 lg:mt-20 h-fit">
            <div className="relative md:max-w-xl">
              <Image 
                src={yourImage.src} 
                alt="you image"
                width={400}
                height={500}
                className="absolute w-40 lg:w-52 left-56 select-none -top-20 hidden sm:block lg:hidden xl:block " />
              <Image 
                src={lineImage.src} 
                alt='line' 
                width={400}
                height={500}
                className="absolute w-20 -left-6 -bottom-6 select-none" />
                
              <Phone className="w-64" imgSrc={testimonials.src} />
            </div>
          </div>
          </>
        </MaxWidthWrapper>
      </section>
      {/* value proposition section */}
      <section className="bg-slate-100 py-24">
        <MaxWidthWrapper className="flex flex-col items-center gap-16 sm:gap-32">
          <>
          <div className="flex flex-col lg:flex-row items-center gap-4 sm:gap-6">
            <h2 
            className="order-1 mt-2 tracking-tight text-balance text-center !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
              What our <span className="relative px-2">customer <Icons.underline className="hidden sm:block pointer-events-none absolute -bottom-6 text-green-600 inset-x-0 "/></span> say
            </h2>
            <Image width={100} height={100} src={snake2.src} alt="sank2" className="w-24 lg:order-2" />
          </div>
          <ReviewsContainer />
          </>
        </MaxWidthWrapper>
        
        <div className="pt-16">
          <Reviews />
        </div>
      </section>
      <section>
        <MaxWidthWrapper className="py-24">
          <>
          <div className="mb-12 px-6 lg:px-8">
            <div className="mx-auto max-w-2xl ms:text-center">
              <h2 
              className="order-1 mt-2 tracking-tight text-balance text-center !leading-tight font-bold text-5xl md:text-6xl text-gray-900">
                Upload your photo and get <span className="relative px-2 bg-green-600 text-white rounded">your own case </span> now
              </h2>
            </div>
          </div>

          <div 
          className="mx-auto max-w-6xl px-6 lg:px-8 ">
            <div 
            className="relative flex flex-col items-center md:grid grid-cols-2 gap-40 ">
              <Image 
              width={100} 
              height={200} 
              src={arrow.src} 
              alt="arrow" 
              className="absolute top-[25rem] md:top-1/2 -translate-y-1/2 z-10 left-1/2 -translate-x-1/2 rotate-90 md:rotate-0"/>
              <div 
              className="relative h-80 md:h-full w-[70%] md:justify-self-end max-w-sm rounded-xl bg-gray-900/5 ring-inset ring-gray-900/10 lg:rounded-2xl ">
                <Image 
                  width={400} 
                  height={800} 
                  src={horse.src} 
                  alt="horse"
                  className="object-cover rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 h-full w-full" />
              </div>
              <Phone imgSrc={horse.src} className="w-[250px]"/>
            </div>
          </div>
          <WebsiteFeatures features={[
            'Hight quality silicon material',
            'scratch and fingerprint resistant coating',
            'wireless charging compatible',
            'five year print warranty'
          ]} className="max-w-prose mt-12 mx-auto sm:text-lg space-y-2 w-fit text-muted-foreground">
            <div className="flex justify-center">

            <Button asChild size={'lg'} className="mx-auto mt-8" >
              <Link href={'/configure/upload'}>
                Create your case now <ArrowRight className="h-4 w-4 ml-1.5" />
              </Link>
            </Button>
            </div>
          </WebsiteFeatures>
          </>
        </MaxWidthWrapper>
      </section>

    </div>
  );
}
