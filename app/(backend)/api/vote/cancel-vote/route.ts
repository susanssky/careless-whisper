
import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get("postId")
    const userId = searchParams.get("userId")

    if (!postId || !userId) {
      return new Response("Post ID or User ID is missing", { status: 400 })
    }

    const vote = await prisma.vote.deleteMany({
      where: {
        postId: parseInt(postId),
        userId: userId,
      },
    })

    const updatedPost = await prisma.post.update({
      where: {
        id: parseInt(postId),
      },
      data: {
        votesNum: {
          decrement: 1,
        },
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error: any) {
    console.error("Error cancelling vote for post:", error)
    return new Response(error.message, { status: 500 })
  }
}
