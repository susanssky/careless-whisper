import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const transcripts = await prisma.transcript.findMany({
      include: {
        cohort: true,
        sentences: true,
        syllabus: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      where: {
        createdAt: {
          lte: new Date(),
        },
      },
    })

    if (transcripts.length === 0) {
      return NextResponse.json(
        { error: "No transcripts found." },
        { status: 404 }
      )
    }

    revalidatePath("/")
    // console.log(transcripts)
    return NextResponse.json(transcripts)
  } catch (error) {
    console.error("Error fetching transcripts:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
