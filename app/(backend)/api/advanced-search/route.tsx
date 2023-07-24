import { NextRequest, NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"

import { Transcript } from ".prisma/client"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const user = searchParams && searchParams.get("user")
  const leader = searchParams && searchParams.get("leader")
  const cohort = searchParams && searchParams.get("cohort")
  const keywords = searchParams && searchParams.get("keywords")
  const syllabusModule = searchParams && searchParams.get("syllabusModule")
  const duration = searchParams ? searchParams.get("duration") || "" : ""
  try {
    let transcripts: Transcript[] = []

    if (user) {
      const userSentences = await prisma.transcript.findMany({
        where: {
          user: {
            name: {
              contains: user,
              mode: "insensitive",
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...userSentences)
    }

    if (leader) {
      const leaderSentences = await prisma.transcript.findMany({
        where: {
          leaderName: {
            contains: leader,
            mode: "insensitive",
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...leaderSentences)
    }

    if (cohort) {
      const cohortSentences = await prisma.transcript.findMany({
        where: {
          cohort: {
            name: {
              equals: cohort,
              mode: "insensitive",
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...cohortSentences)
    }

    if (keywords) {
      const keywordSentences = await prisma.transcript.findMany({
        where: {
          keywords: {
            equals: keywords,
            mode: "insensitive",
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...keywordSentences)
    }

    if (syllabusModule) {
      const syllabusSentences = await prisma.transcript.findMany({
        where: {
          syllabus: {
            name: {
              contains: syllabusModule,
              mode: "insensitive",
            },
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...syllabusSentences)
    }

    if (duration) {
      const durationSentences = await prisma.transcript.findMany({
        where: {
          duration: {
            equals: parseInt(duration),
          },
        },
        include: {
          cohort: true,
          syllabus: true,
          sentences: true,
        },
      })

      transcripts.push(...durationSentences)
    }

    return NextResponse.json(transcripts)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
