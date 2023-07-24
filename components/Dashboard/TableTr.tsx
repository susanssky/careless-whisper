"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { viewTranscript } from "@/lib/viewTranscript"

export default function DashboardTableTr({
  transcript,
}: DashboardTableTrPropsType) {
  const router = useRouter()
  const [viewsNum, setViewsNum] = useState(transcript.viewsNum)

  const handleClick = async () => {
    try {
      const updatedTranscript = await viewTranscript(transcript.id)

      if (updatedTranscript !== null) {
        setViewsNum(updatedTranscript?.viewsNum ?? 0)
      }

      router.refresh()
      router.push(`/dashboard/transcripts/${transcript.id}`)
    } catch (error) {
      console.error("Error navigating to transcript:", error)
    }
  }

  return (
    <tr
      key={transcript.id}
      onClick={handleClick}
      className="cursor-pointer hover:bg-gray-50"
    >
      <td className="py-2 px-4 border ">{transcript.cohort.name}</td>
      <td className="py-2 px-4 border">{transcript.syllabus.name}</td>
      <td className="py-2 px-4 border">{transcript.sessionName}</td>
      <td className="py-2 px-4 border">{transcript.leaderName}</td>
      <td className="py-2 px-4 border">{transcript.viewsNum}</td>
      <td className="py-2 px-4 border">{transcript.votesNum}</td>
    </tr>
  )
}
