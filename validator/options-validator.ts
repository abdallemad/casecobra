import { PRICES } from "@/config/product"
export const COLORS  = [
  {
    label:'Black',
    value:'black',
    tw:{
      border:'border-zinc-900',
      bg:'bg-zinc-900'
    }
  },
  {
    label:'Blue',
    value:'blue',
    tw:{
      border:'border-blue-950',
      bg:'bg-blue-950'
    },
  },
  {
    label:'Rose',
    value:'rose',
    tw:{
      border:'border-rose-950',
      bg:'bg-rose-950'
    }
  }
] as const

export const MODEL ={
  name:'model',
  options:[
    {
      label:'IPhone x',
      value:'iphonex',
    },
    {
      label:'Iphone 11',
      value:'iphone11',
    },
    {
      label:'Iphone 12',
      value:'iphone12',
    },
    {
      label:'Iphone 13',
      value:'iphone13',
    },
    {
      label:'Iphone 14',
      value:'iphone14',
    },
    {
      label:'Iphone 15',
      value:'iphone15',
    },
  ] 
} as const

export const MATERIALS = {
  name:'material',
  options:[
    {
      label:'Silicone',
      value:'silicone',
      description:undefined,
      price:PRICES.materials.silicon
    },
    {
      label:'Poly Carbonate',
      value:'polycarbonate',
      description:'scratch resistant coating',
      price:PRICES.materials.polyCarbonate
    },
  ]
} as const 

export const FINISHES = {
  name:'finish',
  options:[
    {
      label:'Smooth Finish',
      value:'smooth',
      description:undefined,
      price:PRICES.finish.smooth
    },
    {
      label:'Texture Finish',
      value:'texture',
      description:'soft grippy texture',
      price:PRICES.finish.texture
    },
  ]
} as const 