'use client';
import { useInView } from "framer";
import { useRef } from "react"
import testimonials1 from '@/assets/testimonials/1.jpg'
import testimonials2 from '@/assets/testimonials/2.jpg'
import testimonials3 from '@/assets/testimonials/3.jpg'
import testimonials4 from '@/assets/testimonials/4.jpg'
import testimonials5 from '@/assets/testimonials/5.jpg'
import testimonials6 from '@/assets/testimonials/6.jpg'
import ReviewColumn from "./ReviewColumn";
import { cn } from "@/lib/utils";
const PHONES = [
  testimonials1.src,
  testimonials2.src,
  testimonials3.src,
  testimonials4.src,
  testimonials5.src,
  testimonials6.src
]
function splitArray<T>(arr:T[],columns:number){
  const result:Array<Array<T>> = []
  for (let i = 0; i < arr.length; i++) {
    const index = i % columns
    if(!result[index]){
      result[index] = []
    }
    result[index].push(arr[i])
  }
  return result
}

export default function ReviewsGrid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef,{
    once:true,
    amount:0.4,
  });
  const columns = splitArray(PHONES,3)
  const column1 = columns[0]
  const column2 = columns[1]
  const column3 = splitArray(columns[2],2);
  
  return (
    <div 
    ref={containerRef} 
    className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
      {
      isInView && <>
        <ReviewColumn 
          reviews={[...column1,...column2, ...column3.flat()]} 
          msPerPixel={10} 
          reviewClassName={(reviewIndex)=>cn({
            'md:hidden':reviewIndex > column1.length + column3[0].length,
            "lg:hidden":reviewIndex > column1.length
          })}  />
        <ReviewColumn 
          reviews={[...column2, ...column3[1]]} 
          msPerPixel={15} 
          className="hidden md:block "
          reviewClassName={(reviewIndex)=> reviewIndex>= column2.length?"lg:hidden":''}  />

        <ReviewColumn 
          reviews={[...column3.flat()]} 
          msPerPixel={10} 
          className="md:block hidden"
          />
      </>
    }
    {/* fade effect */}
    <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-200"/>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-200"/>
    </div>
  )
}
