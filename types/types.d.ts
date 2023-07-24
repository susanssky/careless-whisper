type createSentenceType = {
  lineNumber: string
  startTime: string
  endTime: string
  content: string
}
//submit the tra from client
type commonFields = {
  sessionName: string
  leaderName: string
  originalVideoLink?: string
  sentences: createSentenceType[]
  summary?: string
}

type createTranscriptType = commonFields & {
  cohortName: { open: boolean; value: string }
  syllabusName: { open: boolean; value: string }
}

type createTranscriptFromClientType = commonFields & {
  cohortName: string
  syllabusName: string
  user: { id: string }
}
//display the transcript
type TranscriptType = {
  id: number
  originalVideoLink?: string
  sessionName: string
  leaderName: string
  duration: number
  viewsNum: number
  votesNum: number
  syllabus: {
    name: string
    link: string
  }
  cohort: {
    name: string
  }
  user: {
    name: string
  }
  sentences: createSentenceType[]
  summary: string
  createdAt: string
}
type DashboardTableTrPropsType = {
  transcript: TranscriptType
}
type SyllabusType = {
  id: number
  name: string
  link: string
}
