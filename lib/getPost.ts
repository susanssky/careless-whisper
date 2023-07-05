export default async function getPost(postId: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post/${postId}`)
  if (!res.ok) throw new Error("failed to fetch data")
  return res.json()
}
