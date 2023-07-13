import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

import { postSelectContent } from "@/lib/helpers"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const getAllPosts = await prisma.post.findMany({
    select: postSelectContent,
  })
  revalidatePath("/")
  return NextResponse.json(getAllPosts)
}
