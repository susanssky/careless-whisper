import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  try {
    const transcripts = await prisma.transcript.findMany({
      include: {
        sentences: true,
        syllabus: true,
      },
      orderBy: {
        viewsNum: "desc",
      },
      take: 3,
      where: {
        viewsNum: { not: null },
      },
    })

    if (transcripts.length === 0) {
      return NextResponse.json(
        { error: "No transcripts found." },
        { status: 404 }
      )
    }

    revalidatePath("/")

    return NextResponse.json(transcripts)
  } catch (error) {
    console.error("Error fetching transcripts:", error)
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    )
  }
}
