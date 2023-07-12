import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { postSelectContent } from "@/lib/helpers"
import { prisma } from "@/lib/prisma"

type paramsProps = { params: { postId: string } }

export async function GET(request: NextRequest, { params }: paramsProps) {
  const { postId } = params
  const getPost = await prisma.post.findFirst({
    where: {
      id: Number(postId),
    },
    select: postSelectContent,
  })
  // console.log(getPost)
  revalidatePath("/")
  return NextResponse.json(getPost)
}
