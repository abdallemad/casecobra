import { createUploadthing, type FileRouter } from "uploadthing/next";
import { z } from "zod";
import sharp from "sharp";
import { db } from "@/db";
const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .input(z.object({ configId: z.string().optional() }))
    .middleware(async ({ input }) => {
      return { input };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const { configId } = metadata.input;

      const res = await fetch(file.url);
      const buffer = await res.arrayBuffer();
      const metaData = await sharp(buffer).metadata();
      const { width, height } = metaData;

      if (!configId) {
        console.log("start upload configuration");
        const configuration = await db.configuration.create({
          data: {
            height: height || 500,
            width: width || 500,
            imageUrl: file.url,
          },
        });
        console.log("done upload the configuration");
        return { configId: configuration.id };
      } else {
        const updateConfiguration = await db.configuration.update({
          where: {
            id: configId,
          },
          data: {
            croppedImageUrl: file.url,
          },
        });
        console.log("done upload updates");
        return { configId: updateConfiguration.id };
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
