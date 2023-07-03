import Image from "next/image"
import Link from "next/link"

import { prisma } from "@/lib/prisma"

export default async function Display() {
  const posts = await prisma.post.findMany({
    select: {
      cohort: true,
      syllabus: true,
      originalVideoLink: true,
      transcription: {
        select: {
          sentences: {
            select: {
              content: true,
            },
          },
        },
      },
      viewsNum: true,
      votesNum: true,
    },
  })

  return (
    <section className="container py-10">
      <div className="max-w-[980px] mx-auto flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Transcription</h1>
        <Link
          target="_blank"
          rel="noreferrer"
          href="/"
          className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md shadow-md"
        >
          Logout
        </Link>
      </div>
      <div className="flex justify-center mt-8">
        <Image
          src="/images/img2.jpg"
          alt="image related to cyf"
          width={550}
          height={550}
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
              <th className="py-2 px-4 border">Original Video link</th>
              <th className="py-2 px-4 border">Transcript content</th>
              <th className="py-2 px-4 border">Number of Views</th>
              <th className="py-2 px-4 border">Votes</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: any) => (
              <tr key={post.id}>
                <td className="py-2 px-4 border">{post.cohortName}</td>
                <td className="py-2 px-4 border">{post.moduleName}</td>
                <td className="py-2 px-4 border">{post.videoLink}</td>
                <td className="py-2 px-4 border">{post.sentences}</td>
                <td className="py-2 px-4 border">{post.numViews || 0}</td>
                <td className="py-2 px-4 border">{post.votes || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
