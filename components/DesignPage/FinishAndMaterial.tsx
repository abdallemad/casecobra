'use client';
import { COLORS,FINISHES,MATERIALS,MODEL } from "@/validator/options-validator";
import { Dispatch, SetStateAction } from "react";
import { RadioGroup, Radio, Label as RadioLabel, Description } from "@headlessui/react";
import { Label } from "../ui/label";
import { cn, formatPrice } from "@/lib/utils";

type FinishAndMaterial = {
  options:{
      color: (typeof COLORS)[number];
      model: (typeof MODEL.options)[number];
      finish: (typeof FINISHES.options)[number];
      material: (typeof MATERIALS.options)[number];
  },
    setOptions:Dispatch<SetStateAction<{
      color: (typeof COLORS)[number];
      model: (typeof MODEL.options)[number];
      finish: (typeof FINISHES.options)[number];
      material: (typeof MATERIALS.options)[number];
  }>>
}
function FinishAndMaterial(
  {options,setOptions}
  :FinishAndMaterial) {
  return (
    <>
      {
        [MATERIALS,FINISHES].map(({name,options:selectableOptions})=>{
          return (
            <RadioGroup 
              key={name} 
              value={options[name]}
              onChange={(val)=>{
                setOptions(prev=>{
                  return {
                    ...prev,
                    [name]:val
                  }
                })
              }}>
                <Label className="capitalize">{name}</Label>
                <div className="mt-3 space-y-4">
                  {
                    selectableOptions.map((option,i)=>{
                      return <Radio 
                      key={i} 
                      value={option}
                      className={({checked,autofocus})=>cn('relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between',{
                        'border-primary':checked || autofocus
                      })}>
                        <span className="flex items-center">
                          <span className="flex flex-col text-sm">
                            <RadioLabel as="span" className='font-medium text-gray-900'>{option.label}</RadioLabel>
                            {
                            option.description 
                            && 
                            <Description as="span" className={'text-gray-500'}>
                              <span className="block sm:inline">{option.description}</span>
                              </Description>
                            }
                          </span>
                        </span>
                        <Description as={'span'} className={'mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right'}>
                          <span className="font-medium text-gray-900">
                            {formatPrice(option.price / 100)}
                          </span>
                          </Description>
                      </Radio>
                    })
                  }
                </div>
          </RadioGroup>
          )
        })}
    </>
  )
}

export default FinishAndMaterial
