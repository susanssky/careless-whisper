"use client"

import React from "react"
import { useRouter } from "next/navigation"

export default function DashboardTableTr({ post }: DashboardTableTrPropsType) {
  const router = useRouter()
  return (
    <tr
      key={post.id}
      onClick={() => router.push(`/dashboard/posts/${post.id}`)}
      className="cursor-pointer hover:bg-gray-50"
    >
      <td className="py-2 px-4 border ">{post.cohort.name}</td>
      <td className="py-2 px-4 border">{post.syllabus.name}</td>
      <td className="py-2 px-4 border">{post.sessionName}</td>
      <td className="py-2 px-4 border">{post.leaderName}</td>
      <td className="py-2 px-4 border">{post.viewsNum}</td>
      <td className="py-2 px-4 border">{post.votesNum}</td>
    </tr>
  )
}
