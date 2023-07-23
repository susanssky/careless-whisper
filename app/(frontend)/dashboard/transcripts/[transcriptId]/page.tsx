import { getTranscript, UserServerSession } from "@/lib/helpers"
import TranscriptComponent from "@/components/Transcript/TranscriptComponent"

type TranscriptDetails = {
  params: { transcriptId: string }
}
export default async function TranscriptDetails({
  params: { transcriptId },
}: TranscriptDetails) {
  const transcript: TranscriptType = await getTranscript(transcriptId)
  const session = await UserServerSession()
  // console.log(session)
  return <TranscriptComponent transcript={transcript} session={session} />
}
