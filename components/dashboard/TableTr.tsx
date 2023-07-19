"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { viewTranscription } from "@/lib/viewTranscription"

export default function DashboardTableTr({ post }: DashboardTableTrPropsType) {
  const router = useRouter()
  const [viewsNum, setViewsNum] = useState(post.viewsNum)

  const handleClick = async () => {
    try {
      const updatedPost = await viewTranscription(post.id)

      if (updatedPost !== null) {
        setViewsNum(updatedPost?.viewsNum ?? 0)
      }

      router.refresh()
      router.push(`/dashboard/posts/${post.id}`)
    } catch (error) {
      console.error("Error navigating to post:", error)
    }
  }

  return (
    <tr
      key={post.id}
      onClick={handleClick}
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
