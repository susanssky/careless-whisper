import { NextRequest, NextResponse } from "next/server"


import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams && searchParams.get("q")
  const user = searchParams && searchParams.get("user")
  const keywords = searchParams && searchParams.get("keywords")
  const category = searchParams && searchParams.get("category")
  const syllabusModule = searchParams && searchParams.get("syllabusModule")
  const duration = searchParams ? searchParams.get("duration") || "" : ""

  try {
 

    const sentences = await prisma.sentence.findMany({
      where: {
       
        transcription: {
          post: {
            user: {
              name: {
                contains: user || "",
                mode: "insensitive",
              },
            },
            cohort: {
              name: {
                contains: category || "",
                mode: "insensitive",
              },
            },
            syllabus: {
              name: {
                contains: syllabusModule || "",
                mode: "insensitive",
              },
            },
            duration: {
              equals: duration !== "" ? parseInt(duration) : undefined,
            },
          },
        },
      },
      include: {
        transcription: true,
      },
    })

    return NextResponse.json(sentences)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
