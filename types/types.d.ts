type createSentenceType = {
  lineNumber: string
  startTime: string
  endTime: string
  content: string
}

type createTranscriptionType = {
  sentences: createSentenceType[]
  postId: number
}
type commonFields = {
  sessionName: string
  leaderName: string
  originalVideoLink?: string
  transcription: createSentenceType[]
  summary?: string
}

type createPostType = commonFields & {
  cohortName: { open: boolean; value: string }
  syllabusName: { open: boolean; value: string }
}

type createPostFromClientType = commonFields & {
  cohortName: string
  syllabusName: string
  user: { id: string }
}
type PostType = {
  id: number
  originalVideoLink?: string
  sessionName: string
  leaderName: string
  duration: number
  viewsNum: number
  votesNum: number
  syllabus: {
    name: string
  }
  cohort: {
    name: string
  }
  user: {
    name: string
  }
  transcription: {
    sentences: {
      lineNumber: string
      startTime: string
      endTime: string
      content: string
    }[]
  }
  summary: string
}
type DashboardTableTrPropsType = {
  post: PostType
}
