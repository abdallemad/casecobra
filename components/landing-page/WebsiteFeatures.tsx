import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

function WebsiteFeatures({features,className,children}:{features:string[],className?:string,children?:React.ReactNode}) {
  return (
    <ul className={cn("mt-8 space-y-8 font-medium flex flex-col items-center sm:items-start",className)}>
    <div className="space-y-2">
      {
        features.map((ftr,i)=>{
          return <li className="flex gap-1.5 items-center text-left w-fit" key={i}>
          <Check className="h-5 w-5 shrink-0 text-green-600" />
          {ftr}
        </li>
        })
      }
    </div>
    {children}
  </ul>
  )
}

export default WebsiteFeatures
