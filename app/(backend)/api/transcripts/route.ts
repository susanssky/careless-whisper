import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

import { transcriptSelectContent } from "@/lib/helpers"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const getAllTranscripts = await prisma.transcript.findMany({
    select: transcriptSelectContent,
  })
  revalidatePath("/")
  return NextResponse.json(getAllTranscripts)
}
