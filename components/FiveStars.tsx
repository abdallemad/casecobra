import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
export default function FiveStars({className}:{className?:string}) {
  return (
    <div className={cn("flex gap-0.5",className)}>
      {
        Array.from({length:5},(_,i)=>{
          return <Star className="h-4 w-4 text-green-600 fill-green-600" key={i}/>
        })
      }
    </div>
  )
}
