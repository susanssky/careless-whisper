import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams && searchParams.get("q")
  try {
    if (!query || query.length < 3) {
      throw new Error(
        "Invalid request: Query must be at least three characters long"
      )
    }

    const transcripts = await prisma.transcript.findMany({
      where: {
        sentences: {
          some: {
            content: {
              contains: query,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        sentences: true,
        cohort: true,
        syllabus: true,
      },
    })

    await prisma.searchQuery.create({
      data: {
        query,
      },
    })

    return NextResponse.json(transcripts)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
