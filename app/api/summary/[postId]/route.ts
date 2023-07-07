import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

type paramsProps = { params: { postId: string } }

export async function PUT(request: NextRequest, { params }: paramsProps) {
  const { postId } = params
  const receivedSummary = await request.json()
  const updatedSummary = await prisma.post.update({
    where: { id: Number(postId) },
    data: { summary: receivedSummary.summaried },
  })
  revalidatePath("/")
  return new Response(JSON.stringify(updatedSummary))
}
