import Image from "next/image"
import FiveStars from "../FiveStars"
import { Check } from "lucide-react"
function UsersReview({comment,name,purchase ,image}:{comment:string,name:string,purchase:string,image:string}) {
  return (
    <div className="flex flex-auto flex-col gap-4 lg:pr-8 xl:pr-20">
              <FiveStars className="mb-2"/>
              <div className="text-lg leading-8">
                <p>
                  {`"`}{comment}{'"'}
                </p>
              </div>
              <div className="flex gap-2 mt-2">
                <Image src={image} alt="user1" width={(12*16)} height={(12*16)} className="rounded-full h-12 w-12 object-cover"/>
                <div className="flex flex-col">
                  <p className="font-semibold">{name}</p>
                  <div className="flex gap-1 5 items-center text-zinc-600">
                    <Check className="h-4 w-4 stroke-[3xp] text-green-600"/> <p className="text-sm">{purchase} </p>
                  </div>
                </div>
              </div>
            </div>
  )
}

export default UsersReview
