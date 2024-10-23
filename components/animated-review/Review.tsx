import { cn } from "@/lib/utils"
import Phone from "../Phone";
import { HTMLAttributes } from "react"

interface ReviewProps extends HTMLAttributes<HTMLDivElement>{
  imgSrc:string
}
function Review({imgSrc,className,...props}:ReviewProps) {
  const POSSIBLE_ANIMATION_DELAY = ['0s', '0.1s', '0.2s','0.3s','0.4s','0.5s'];
  const animationDelay = POSSIBLE_ANIMATION_DELAY[(Math.floor(Math.random()* POSSIBLE_ANIMATION_DELAY.length))]
  return (
    <div 
    className={cn('animate-fade-in rounded-[2.25rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5',className)}
    style={{animationDelay:animationDelay}} 
    {...props} >
      <Phone imgSrc={imgSrc}/>
    </div>
  )
}

export default Review
