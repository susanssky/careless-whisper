import { getAllSyllabuses, UserServerSession } from "@/lib/helpers"
import CreateTranscriptComponent from "@/components/CreateTranscript/CreateTranscriptComponent"

export default async function CreateTranscript() {
  const session = await UserServerSession()
  const syllabusesData = await getAllSyllabuses()
  const syllabusesName = syllabusesData.map((data) => {
    return { value: data.name }
  })
  // console.log(syllabusesName)

  return (
    <CreateTranscriptComponent
      syllabusesName={syllabusesName}
      session={session}
    />
  )
}
