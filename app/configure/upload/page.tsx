'use client'
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image as ImageLuce, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Dropzone, { FileRejection } from "react-dropzone";

export default function Page() {
  const [isDragOver,setIsDrayOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0)
  const router = useRouter()
  const [isPending,startTransition] = useTransition();
  const {toast} = useToast()

  const {startUpload, isUploading} = useUploadThing('imageUploader',{
    onClientUploadComplete:([data])=>{
      const configId = data.serverData.configId;
      startTransition(()=>{
        router.push(`/configure/design?id=${configId}`)
      })
    },
    onUploadProgress(p){
      setUploadProgress(p);
    }
  })
  const onDropRejected = (rejectedFiles:FileRejection[])=>{
    const [file] = rejectedFiles;
    setIsDrayOver(false);
    toast({
      title:`${file.file.type} is not supported`,
      description:`this file is rejected: ${file.file.name}`,
      variant:"destructive"
    })
  }
  const onDropAccepted = (acceptedFiles:File[])=>{
    startUpload(acceptedFiles, { configId:undefined })
    setIsDrayOver(false)
  }
  
  return (
    <div 
    className={
      cn('relative h-full w-full flex justify-center flex-col items-center flex-1 my-16 p-2 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl ', {
        'ring-blue-900/25 bg-blue-900/10':isDragOver
      })
      }>
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone 
        onDropAccepted={onDropAccepted} 
        onDropRejected={onDropRejected}
        accept={{
          'image/*':['.png','.jpeg','.jpg']
        }}
        onDragEnter={()=>setIsDrayOver(true)}
        onDragLeave={()=>setIsDrayOver(false)}>
        {({getRootProps, getInputProps,}) => (
          <div 
            className="h-full w-full flex-1 flex flex-col items-center justify-center" 
            {...getRootProps()}>
              <input {...getInputProps()}/>
              {
                isDragOver? 
                  (
                    <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2"/>
                  ):
                  isUploading || isPending? (
                    <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2"/>
                  ):
                  (
                    <ImageLuce className="h-6 w-6 text-zinc-600 mb-2" />
                  )
              }
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {
                  isUploading? (
                      <div className="flex flex-col items-center">
                        <p>Uploading...</p>
                        <Progress max={100}  value={uploadProgress} className="mt-2 w-40 bg-gray-300 h-2"/>
                      </div>
                    ) : 
                    isPending? (
                      <div className="flex flex-col items-center">
                        <p>Redirecting please waite..</p>
                      </div>
                    ): 
                    isDragOver?(
                      <p>
                        <span className="font-semibold">Drop file </span>
                        to upload
                      </p>
                    ): 
                    (
                      <p>
                        <span className="font-semibold">Click to upload </span> 
                        or drag and drop
                      </p>
                    )
                }
              </div>
              {!isPending && <p className="text-xs text-zinc-500"> PNG, JPEG, JPG</p>}
          </div>
        )}
        </Dropzone>
      </div>
    </div>
  )
}
