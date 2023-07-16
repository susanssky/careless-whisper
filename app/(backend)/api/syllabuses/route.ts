import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"

export async function GET() {
  const getAllSyllabuses = await prisma.syllabus.findMany()
  revalidatePath("/")
  return NextResponse.json(getAllSyllabuses)
}
