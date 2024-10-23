import { Metadata } from 'next'
import { notFound } from "next/navigation"
import DesignConfigurator from "./DesignConfigurator"
import { db } from "@/db"

export const metadata: Metadata = {
  title: 'Design Configuration',
}

interface Configuration {
  id: string
  imageUrl: string
  width: number
  height: number
}

interface PageProps {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function DesignPage({ searchParams }: PageProps) {
  const id = Array.isArray(searchParams.id) ? searchParams.id[0] : searchParams.id

  if (!id || typeof id !== "string") {
    notFound()
  }

  try {
    const configuration = await db.configuration.findUnique({ where: { id } })

    if (!configuration) {
      notFound()
    }

    const { imageUrl, width, height, id: configId } = configuration as Configuration

    return (
      <DesignConfigurator
        configId={configId}
        imageUrl={imageUrl}
        imageDimensions={{ width, height }}
      />
    )
  } catch (error) {
    console.error("Error fetching configuration:", error)
    notFound()
  }
}