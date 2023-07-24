"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"

import { viewTranscript } from "@/lib/viewTranscript"

export default function DashboardTableBodyTr({
  transcript,
}: DashboardTableBodyTrPropsType) {
  const router = useRouter()

  const [viewsNum, setViewsNum] = useState(transcript.viewsNum)
  const dataTimeStyle = new Date(transcript.createdAt)
  const handleClick = async () => {
    try {
      const updatedTranscript = await viewTranscript(transcript.id)

      if (updatedTranscript !== null) {
        setViewsNum(updatedTranscript?.viewsNum ?? 0)
      }

      router.push(`/dashboard/transcripts/${transcript.id}`)
    } catch (error) {
      console.error("Error navigating to transcript:", error)
    }
  }

  return (
    <tr
      key={transcript.id}
      onClick={handleClick}
      className="cursor-pointer hover:bg-red-500 hover:text-white dark:hover:text-white"
    >
      <td className="py-1 border">{transcript?.cohort?.name}</td>
      <td className="py-1 border">{transcript?.syllabus?.name}</td>
      <td className="py-1 border">
        {transcript.sessionName.length > 12
          ? transcript.sessionName.slice(0, 12) + "..."
          : transcript.sessionName}
      </td>
      <td className="py-1 border">
        {" "}
        {transcript.leaderName.length > 12
          ? transcript.leaderName.slice(0, 12) + "..."
          : transcript.leaderName}
      </td>
      <td className="py-1 border">{transcript.viewsNum}</td>
      <td className="py-1 border">{transcript.votesNum}</td>
      <td className="py-1 border">{dataTimeStyle.toLocaleString("en-GB")}</td>
    </tr>
  )
}
