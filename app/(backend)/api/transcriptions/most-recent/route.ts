import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"


import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const transcriptions = await prisma.transcription.findMany({
      include: {
        sentences: true,
        post: {
          include: {
            syllabus: true,
          },
        },
      },
      orderBy: {
        post: {
          createdAt: "desc", 
        },
      },
      take: 3,
      where: {
        post: {
          createdAt: {
            lte: new Date(), 
          },
        },
      },
    })

    if (transcriptions.length === 0) {
      return NextResponse.json(
        { error: "No transcriptions found." },
        { status: 404 }
      )
    }

    revalidatePath("/")

    return NextResponse.json(transcriptions)
  } catch (error) {
    console.error("Error fetching transcriptions:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
