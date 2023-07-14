type createSentenceType = {
  lineNumber: string
  startTime: string
  endTime: string
  content: string
}
//submit the post from client
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
//display the post
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
    sentences: createSentenceType[]
  }
  summary: string
}
type DashboardTableTrPropsType = {
  post: PostType
}
type SyllabusType = {
  id: number
  name: string
  link: string
}
