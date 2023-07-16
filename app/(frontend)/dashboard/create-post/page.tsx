import { getAllSyllabuses, UserServerSession } from "@/lib/helpers"
import CreatePostComponent from "@/components/create-post/CreatePostComponent"

export default async function CreatePost() {
  const session = await UserServerSession()
  const syllabusesData = await getAllSyllabuses()
  const syllabusesName = syllabusesData.map((data) => {
    return { value: data.name }
  })
  // console.log(syllabusesName)

  return (
    <CreatePostComponent syllabusesName={syllabusesName} session={session} />
  )
}
