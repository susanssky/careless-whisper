import { NextRequest, NextResponse } from "next/server"
import { Sentence } from "@prisma/client"

import { prisma } from "@/lib/prisma"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const user = searchParams && searchParams.get("user")
  const cohort = searchParams && searchParams.get("cohort")
  const keywords = searchParams && searchParams.get("keywords")
  const syllabusModule = searchParams && searchParams.get("syllabusModule")
  const duration = searchParams ? searchParams.get("duration") || "" : ""

  try {
    let sentences = []

    if (user) {
      const userSentences = await prisma.sentence.findMany({
        where: {
          transcription: {
            post: {
              user: {
                name: {
                  equals: user,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          transcription: true,
        },
      })

      sentences.push(...userSentences)
    }

    if (cohort) {
      const cohortSentences = await prisma.sentence.findMany({
        where: {
          transcription: {
            post: {
              cohort: {
                name: {
                  equals: cohort,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          transcription: true,
        },
      })

      sentences.push(...cohortSentences)
    }

    if (keywords) {
      const keywordSentences = await prisma.sentence.findMany({
        where: {
          transcription: {
            post: {
              keywords: {
                equals: keywords,
                mode: "insensitive",
              },
            },
          },
        },
        include: {
          transcription: true,
        },
      })

      sentences.push(...keywordSentences)
    }

    if (syllabusModule) {
      const syllabusSentences = await prisma.sentence.findMany({
        where: {
          transcription: {
            post: {
              syllabus: {
                name: {
                  equals: syllabusModule,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        include: {
          transcription: true,
        },
      })

      sentences.push(...syllabusSentences)
    }

    if (duration) {
      const durationSentences = await prisma.sentence.findMany({
        where: {
          transcription: {
            post: {
              duration: {
                equals: parseInt(duration),
              },
            },
          },
        },
        include: {
          transcription: true,
        },
      })

      sentences.push(...durationSentences)
    }

    return NextResponse.json(sentences)
  } catch (error: any) {
    console.error(error)
    return new Response(error.message, { status: 500 })
  }
}
