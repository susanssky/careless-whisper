import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/authOptions"

export async function getAllTranscripts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/transcripts`, {
    cache: "no-store",
  })
  // console.log(res)
  if (!res.ok) throw new Error("failed to fetch data")

  const transcriptsData: TranscriptType[] = await res.json()
  // console.log(transcriptsData)
  const transcripts = transcriptsData.sort((a, b) => a.id - b.id)
  return transcripts
}
export async function getTranscript(transcriptId: string) {
  const res = await fetch(
    `${process.env.NEXTAUTH_URL}/api/transcript/${transcriptId}`,
    {
      cache: "no-store",
    }
  )
  if (!res.ok) throw new Error("failed to fetch data")
  const transcript: TranscriptType = await res.json()
  return transcript
}

export async function UserServerSession() {
  return await getServerSession(authOptions)
}
export async function getAllSyllabuses() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/syllabuses`)
  // console.log(res)
  if (!res.ok) throw new Error("failed to fetch data")
  const syllabusesData: SyllabusType[] = await res.json()
  const syllabuses = syllabusesData.sort((a, b) => a.id - b.id)
  return syllabuses
}
//---api---
//transcript select content in Prisma
export const transcriptSelectContent = {
  id: true,
  cohort: { select: { name: true } },
  syllabus: { select: { name: true, link: true } },
  sessionName: true,
  leaderName: true,
  originalVideoLink: true,
  keywords: true,
  duration: true,
  viewsNum: true,
  votesNum: true,
  votes: { select: { userId: true } },
  user: { select: { name: true } },
  sentences: {
    select: {
      lineNumber: true,
      startTime: true,
      endTime: true,
      content: true,
    },
  },
  summary: true,
  createdAt: true,
}
