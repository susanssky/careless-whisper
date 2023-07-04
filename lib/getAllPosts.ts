export default async function getAllPosts() {
  // const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`, {
  //   cache: "no-store",
  // })
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/post`)
  if (!res.ok) throw new Error("failed to fetch data")
  return res.json()
}
