export async function getAllPosts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`)
  if (!res.ok) throw new Error("failed to fetch data")
  return res.json()
}
export async function getPost(postId: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${postId}`)
  if (!res.ok) throw new Error("failed to fetch data")
  return res.json()
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
  syllabus: { select: { name: true } },
  cohort: { select: { name: true } },
  user: { select: { name: true } },
  transcription: { select: { sentences: { select: { content: true } } } },
  summary: true,
}
