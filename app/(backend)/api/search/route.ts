import { NextRequest, NextResponse } from "next/server";



import { prisma } from "@/lib/prisma";





export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams && searchParams.get("q")
  try {
    if (!query || query.length < 3) {
      throw new Error(
        "Invalid request: Query must be at least three characters long"
      )
    }

    const posts = await prisma.post.findMany({
      where: {
        transcription: {
          sentences: {
            some: {
              content: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
        },
      },
      include: {
        transcription: {
          include: {
            sentences: true,
          },
        },
        cohort: true, 
        syllabus: true, 
      },
    })

    await prisma.searchQuery.create({
      data: {
        query,
      },
    })

    return NextResponse.json(posts)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}