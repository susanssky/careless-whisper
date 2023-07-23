import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const body: createTranscriptFromClientType = await request.json()
  const {
    cohortName,
    syllabusName,
    sessionName,
    leaderName,
    originalVideoLink,
    sentences,
    user,
    summary,
  } = body
  // console.log(body)

  const createdTranscript = await prisma.transcript.create({
    data: {
      cohort: {
        connectOrCreate: {
          where: { name: cohortName },
          create: { name: cohortName },
        },
      },
      syllabus: {
        connectOrCreate: {
          where: { name: syllabusName },
          create: { name: syllabusName },
        },
      },
      originalVideoLink,
      sessionName,
      leaderName,
      summary,
      user: { connect: { id: user.id } },
      sentences: {
        createMany: { data: sentences },
      },
    },
  })
  revalidatePath("/")
  return NextResponse.json(createdTranscript)
}
