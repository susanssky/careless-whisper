import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

import { transcriptSelectContent } from "@/lib/helpers"
import { prisma } from "@/lib/prisma"

type paramsProps = { params: { transcriptId: string } }

export async function GET(request: NextRequest, { params }: paramsProps) {
  const { transcriptId } = params
  const getPost = await prisma.transcript.findFirst({
    where: {
      id: Number(transcriptId),
    },
    select: transcriptSelectContent,
  })
  // console.log(getPost)
  revalidatePath("/")
  return NextResponse.json(getPost)
}

export async function DELETE(request: NextRequest, { params }: paramsProps) {
  const { transcriptId } = params
  // console.log(transcriptId)

  const votesForPost = await prisma.vote.findMany({
    where: {
      transcriptId: parseInt(transcriptId),
    },
  })

  if (votesForPost.length > 0) {
    await prisma.vote.deleteMany({
      where: {
        transcriptId: parseInt(transcriptId),
      },
    })
  }

  const deletedPost = await prisma.transcript.delete({
    where: {
      id: Number(transcriptId),
    },
  })
  console.log(deletedPost)

  return NextResponse.json(deletedPost)
}

export async function POST(request: NextRequest, { params }: paramsProps) {
  try {
    const { transcriptId } = params

    if (!transcriptId) {
      return new Response("Post ID is missing", { status: 400 })
    }

    const viewedPost = await prisma.transcript.update({
      where: { id: parseInt(transcriptId) },
      data: { viewsNum: { increment: 1 } },
    })
    return NextResponse.json(viewedPost)
  } catch (error: any) {
    console.error("Error updating views:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: paramsProps) {
  try {
    const { transcriptId } = params

    if (!transcriptId) {
      return new Response("Post ID is missing", { status: 400 })
    }

    const { cohortName, syllabusName, sessionName, leaderName, summary } =
      await request.json()

    const cohort = await prisma.cohort.upsert({
      where: { name: cohortName },
      create: { name: cohortName },
      update: {},
    })

    const syllabus = await prisma.syllabus.upsert({
      where: { name: syllabusName },
      create: { name: syllabusName },
      update: {},
    })

    const updatedPost = await prisma.transcript.update({
      where: { id: parseInt(transcriptId) },
      data: {
        sessionName,
        leaderName,
        cohort: { connect: { id: cohort.id } },
        syllabus: { connect: { id: syllabus.id } },
        summary,
      },
    })

    return NextResponse.json(updatedPost)
  } catch (error: any) {
    console.error("Error updating transcript", error)
    return new Response("Internal Server Error", { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}
