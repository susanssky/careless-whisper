import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/authOptions"

export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
    cache: "no-store",
  })
  // console.log(res)
  if (!res.ok) throw new Error("failed to fetch data")
  const postsData: PostType[] = await res.json()
  // console.log(postsData)
  const posts = postsData.sort((a, b) => a.id - b.id)
  return posts
}
export async function getPost(postId: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${postId}`, {
    cache: "no-store",
  })
  if (!res.ok) throw new Error("failed to fetch data")
  const post: PostType = await res.json()
  return post
}

export async function UserServerSession() {
  return await getServerSession(authOptions)
}
export async function getAllSyllabuses() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/syllabuses`)
  // console.log(res)
  if (!res.ok) throw new Error("failed to fetch data")
  const syllabusesData: SyllabusType[] = await res.json()
  // console.log(syllabusesData)
  const syllabuses = syllabusesData.sort((a, b) => a.id - b.id)
  // console.log(syllabusesData)
  return syllabuses
}
//---api---
//post select content in Prisma
export const postSelectContent = {
  id: true,
  originalVideoLink: true,
  sessionName: true,
  leaderName: true,
  duration: true,
  viewsNum: true,
  votesNum: true,
  syllabus: { select: { name: true, link: true } },
  cohort: { select: { name: true } },
  user: { select: { name: true } },
  transcription: {
    select: {
      sentences: {
        select: {
          lineNumber: true,
          startTime: true,
          endTime: true,
          content: true,
        },
      },
    },
  },
  summary: true,
}
