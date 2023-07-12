import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

type paramsProps = { params: { postId: string } }

export async function DELETE(request: NextRequest, { params }: paramsProps) {
  const { postId } = params
  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  })

  return NextResponse.json(deletedPost)
}
