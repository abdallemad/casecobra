'use client'
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950
// bg-zinc-900 border-zinc-900
import CaseColors from "@/components/DesignPage/CaseColors"
import FinishAndMaterial from "@/components/DesignPage/FinishAndMaterial"
import Model from "@/components/DesignPage/Model"
import PhoneCustomize from "@/components/DesignPage/PhoneCustomize"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/utils"
import { COLORS, FINISHES, MATERIALS, MODEL } from "@/validator/options-validator"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { useRef, useState } from "react"
import { BASE_PRICE } from "@/config/product"
import { Button } from "@/components/ui/button"
import { ArrowRight, LoaderIcon, SplineIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useUploadThing } from "@/lib/uploadthing"
import { base64ToBlob } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { ConfigureSaved,saveConfigAction } from "./action"
import axios from 'axios'
import { useRouter } from "next/navigation"

type DesignConfiguratorProps = {
  imageUrl:string,
  configId:string,
  imageDimensions:{
    width:number,
    height:number
  }
}

function DesignConfigurator(
  {configId,imageUrl,imageDimensions}:
  DesignConfiguratorProps
) {
  const {toast} = useToast()
  const router = useRouter();
  const {mutate:saveConfig , isPending} = useMutation({
    mutationKey:['config',configId],
    mutationFn:async(data:ConfigureSaved)=>{
      return await Promise.all([saveConfiguration(),saveConfigAction(data)])
    },
    onError:()=>{
      toast({
        title:'Upload Failed!',
        description:'some thing went wrong when saving your config try again later.',
        variant:'destructive',
      })
    },
    onSuccess:()=>{
      router.push(`/configure/preview?id=${configId}`)
    }
  })
  const {startUpload} = useUploadThing('imageUploader',{

  })
  const [options,setOptions] = useState<{
    color:(typeof COLORS)[number],
    model:(typeof MODEL.options)[number],
    finish:(typeof FINISHES.options)[number],
    material:(typeof MATERIALS.options)[number]
  }>({
    color:COLORS[0],
    model:MODEL.options[0],
    finish:FINISHES.options[0],
    material:MATERIALS.options[0]
  })
  const [renderedPosition, setRenderedPosition ] = useState({
    x:150,
    y:205
  })
  
  const [renderDimensions, setRenderDimensions] = useState({
    width: imageDimensions.width /4,
    height: imageDimensions.height /4,
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const phoneCaseRef = useRef<HTMLDivElement>(null);

  async function saveConfiguration(){
    try {
      const {left:caseLeft, top:caseTop, width, height} = phoneCaseRef.current!.getBoundingClientRect()
      const {left:containerLeft, top:containerTop} = containerRef.current!.getBoundingClientRect()
      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop
      const XFromPhone = Math.floor(renderedPosition.x - leftOffset);
      const YFromPhone = Math.floor(renderedPosition.y - topOffset);
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d');
      const userImage = new Image()
      canvas.width = width;
      canvas.height = height
      userImage.src = imageUrl
      userImage.crossOrigin = 'anonymous'
      await new Promise((resolve)=> userImage.onload = resolve)
      ctx?.drawImage(
        userImage,
        XFromPhone,
        YFromPhone,
        renderDimensions.width, 
        renderDimensions.height
      );
      const base64 = canvas.toDataURL();
      const base64Data = base64.split(',')[1];
      const blob = base64ToBlob(base64Data,'image/png');
      const file = new File([blob],'filename.bng',{type:'image/png'})
      await startUpload([file],{configId})
    } catch (error) {
      toast({
        title:'Some thing happened wrong please try again later',
        description:'confirm your configurations is failed!!',
        variant:'destructive'
      })
    }
  }

  return (
    <div 
    className="relative gap-2 mt-20 grid lg:grid-cols-3 mb-20 pb-20">
      {/* FIRST TOW COLUMN CUSTOM IMAGE */}
      <div
      ref={containerRef} 
      className="relative h-[37.5rem] overflow-hidden lg:col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">

        <PhoneCustomize 
          bgColor={options.color.tw.bg} 
          imageUrl={imageUrl}
          imageDimensions={imageDimensions} 
          phoneCaseRef={phoneCaseRef}
          setRenderedPosition={setRenderedPosition}
          setRenderDimensions={setRenderDimensions}/>

      </div> 

      {/* OPTIONS */}
      <div className="h-[37.5rem] flex flex-col bg-white">
        <ScrollArea className="relative flex-1 overflow-auto">
          {/* FADE IN EFFECT */}
          <div 
          aria-hidden 
          className="absolute z-10 inset-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none " />
          <div className="px-8 pb-12 pt-12">
            <h2 className="tracking-tighter font-bold text-3xl">Customize your case</h2>
            <Separator className="my-6"/>
            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">

                <CaseColors 
                options={options} 
                setOptions={setOptions}/>

                <div className="relative flex flex-col gap-3 w-full ">
                  <Model options={options} setOptions={setOptions} />
                </div>
                
                <FinishAndMaterial options={options} setOptions={setOptions} />
              </div>
            </div>
          </div>
        </ScrollArea>
        <div className="w-full px-8 h-16 bg-white">
          <Separator />
          <div className="w-full h-full flex justify-end items-center">
            <div className="w-full flex gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(
                (BASE_PRICE + options.finish.price + options.material.price) / 100
                )}
              </p>
              <Button onClick={()=> saveConfig({
                color:options.color.value,
                configId,
                finish:options.finish.value,
                material:options.material.value,
                model:options.model.value
              })} size={'sm'} className="w-full " disabled={isPending}>
                {
                  isPending? (
                    <>
                      <LoaderIcon className="animate-spin"/>
                      saving...
                    </>
                  ):(
                    <>
                      <span>Confirm</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 inline" />
                    </>
                  )
                }
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default DesignConfigurator