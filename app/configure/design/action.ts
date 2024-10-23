'use server';
import { db } from "@/db";
import { Color,Finish,Material,PhoneModel } from "@prisma/client";
export type ConfigureSaved = {
  color:Color,
  finish:Finish,
  material:Material,
  model:PhoneModel,
  configId:string,
}
export async function saveConfigAction ({
  color,
  finish,
  material,
  model,
  configId
}:ConfigureSaved){

  await db.configuration.update({
    where:{
      id:configId
    },
    data:{
      color,
      finish,
      material,
      model
    }
  })
}