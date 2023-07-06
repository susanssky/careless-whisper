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
}
