type createSentenceType = {
  lineNumber: string
  startTime: string
  endTime: string
  content: string
}
type transcriptionType = createSentenceType[]

type createTranscriptionType = {
  sentences: createSentenceType[]
  postId: number
}
type commonFields = {
  sessionName: string
  leaderName: string
  originalVideoLink?: string
  transcription: transcriptionType
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
