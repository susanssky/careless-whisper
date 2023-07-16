import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";



import { postSelectContent } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";





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

export async function DELETE(request: NextRequest, { params }: paramsProps) {
  const { postId } = params
  const deletedPost = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  })

  return NextResponse.json(deletedPost)
}

export async function POST(request: NextRequest, { params }: paramsProps) {
  try {
     const { postId } = params

    if (!postId) {
      return new Response("Post ID is missing", { status: 400 })
    }

    const viewedPost = await prisma.post.update({
      where: { id: parseInt(postId) },
      data: { viewsNum: { increment: 1 } },
    })
    return NextResponse.json(viewedPost)
  } catch (error: any) {
    console.error("Error updating views:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}