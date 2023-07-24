import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const transcriptId = searchParams.get("transcriptId")
    const userId = searchParams.get("userId")

    if (!transcriptId || !userId) {
      return new Response("Transcript ID or User ID is missing", {
        status: 400,
      })
    }

    const vote = await prisma.vote.deleteMany({
      where: {
        transcriptId: parseInt(transcriptId),
        userId: userId,
      },
    })

    const updatedTranscript = await prisma.transcript.update({
      where: {
        id: parseInt(transcriptId),
      },
      data: {
        votesNum: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json(updatedTranscript)
  } catch (error: any) {
    console.error("Error cancelling vote for transcript:", error)

    return new Response(error.message, { status: 500 })
  }
}
