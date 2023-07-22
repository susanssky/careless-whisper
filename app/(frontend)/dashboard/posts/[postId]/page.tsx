import { getPost, UserServerSession } from "@/lib/helpers"
import PostComponent from "@/components/post/PostComponent"

type PostDetails = {
  params: { postId: string }
}
export default async function TranscriptDetails({
  params: { postId },
}: PostDetails) {
  const post: PostType = await getPost(postId)
  const session = await UserServerSession()
  // console.log(session)
  return <PostComponent post={post} session={session} />
}
