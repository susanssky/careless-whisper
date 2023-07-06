import { revalidatePath } from "next/cache"
import { NextResponse, type NextRequest } from "next/server"

import { prisma } from "@/lib/prisma"

export async function POST(request: NextRequest) {
  const body: createPostFromClientType = await request.json()
  const {
    cohortName,
    syllabusName,
    sessionName,
    leaderName,
    originalVideoLink,
    transcription,
    user,
  } = body
  // console.log(body)

  const createdPost = await prisma.post.create({
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
      user: { connect: { id: user.id } },
      transcription: {
        create: {
          sentences: {
            createMany: { data: transcription },
          },
        },
      },
    },
  })
  revalidatePath("/")
  return NextResponse.json(createdPost)
}
