import Image from "next/image"
import Link from "next/link"

import getAllPosts from "@/lib/getAllPosts"
import UserSession from "@/components/dashboard/UserSession"

import SearchInput from "@/components/SearchInput"

export default async function Dashboard() {
  const postsData = getAllPosts()
  const posts = await postsData

  return (
    <section className="container py-10">
      <SearchInput/>
      <UserSession />
      <div className="max-w-[980px] mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Transcription</h1>
      </div>
      <div className="flex justify-center mt-8">
        <Image
          src="/images/img2.jpg"
          alt="image related to cyf"
          width={350}
          height={350}
          className="rounded"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-red-500">
          List of transcripts
        </h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Cohort name</th>
              <th className="py-2 px-4 border">Syllabus module name</th>
              <th className="py-2 px-4 border">Session name</th>
              <th className="py-2 px-4 border">Leader name</th>
              <th className="py-2 px-4 border">Number of Views</th>
              <th className="py-2 px-4 border">Votes</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border">{post.cohort.name}</td>
                <td className="py-2 px-4 border">{post.syllabus.name}</td>
                <td className="py-2 px-4 border">{post.sessionName}</td>
                <td className="py-2 px-4 border">{post.leaderName}</td>
                <td className="py-2 px-4 border">{post.viewsNum}</td>
                <td className="py-2 px-4 border">{post.votesNum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
