import { Suspense } from "react"
import Image from "next/image"

import getAllPosts from "@/lib/getAllPosts"
import DashboardTableTr from "@/components/dashboard/TableTr"
import UserSession from "@/components/dashboard/UserSession"

import Loading from "../../components/dashboard/Loading"

export default async function Dashboard() {
  const postsData: Promise<PostType[]> = getAllPosts()
  const posts = await postsData

  return (
    <Suspense fallback={<Loading />}>
      <section className="container py-10">
        <UserSession />
        <div className="max-w-[980px] mx-auto flex items-center justify-between"></div>
        <div className="flex justify-center mt-8">
          <Image
            src="/images/img2.jpg"
            alt="image related to cyf"
            width={200}
            height={200}
            className="rounded"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-center mt-8 mb-4 text-red-500">
            List of transcripts
          </h2>

          <table className="w-full border-collapse text-center">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Cohort</th>
                <th className="py-2 px-4 border">Syllabus</th>
                <th className="py-2 px-4 border">Session</th>
                <th className="py-2 px-4 border">Leader</th>
                <th className="py-2 px-4 border">Views</th>
                <th className="py-2 px-4 border">Votes</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <DashboardTableTr post={post} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </Suspense>
  )
}
