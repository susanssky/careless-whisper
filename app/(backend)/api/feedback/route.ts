import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const transcriptId = searchParams.get("transcriptId")
    const userId = searchParams.get("userId")
    const feedbackText = searchParams.get("feedbackText")

    if (!transcriptId || !userId || !feedbackText) {
      return new Response("Post ID, User ID, or Feedback Text is missing", {
        status: 400,
      })
    }

    const feedback = await prisma.feedback.create({
      data: {
        transcriptId: parseInt(transcriptId),
        userId,
        text: feedbackText,
      },
    })

    return NextResponse.json(feedback)
  } catch (error: any) {
    console.error("Error submitting feedback:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
