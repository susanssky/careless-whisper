import { NextResponse, type NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"

type Body = {
  context: string
}
export default async function POST(request: NextRequest) {
  const body: Body = await request.json()
  prisma.sentence.create({
    data: body, //wait leila has done the transcription models to continues
  })
  return NextResponse.json({ message: `The transcription is uploaded` })
}
