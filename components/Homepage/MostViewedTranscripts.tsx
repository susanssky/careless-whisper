"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  getMostViewedTranscripts,
  Transcript,
} from "@/lib/mostViewedTranscripts"
import { viewTranscript } from "@/lib/viewTranscript"

const MostViewedTranscripts = () => {
  const [transcripts, setTranscripts] = useState<Transcript[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTranscripts() {
      try {
        const fetchedTranscripts = await getMostViewedTranscripts()
        setTranscripts(fetchedTranscripts)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch most viewed transcripts")
        setLoading(false)
      }
    }

    fetchTranscripts()
  }, [])

  const router = useRouter()

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const transcriptId = Number(event.currentTarget.dataset.transcriptid)

    try {
      const updatedTranscript = await viewTranscript(transcriptId)

      router.push(`/dashboard/transcripts/${transcriptId}`)
    } catch (error) {
      console.error("Error updating views:", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Most Viewed</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
          {transcripts?.map((transcript) => (
            <Link
              key={transcript?.id}
              href={`/dashboard/transcripts/${transcript?.id}`}
              className="bg-white shadow-md p-4 rounded-md block"
              onClick={handleClick}
              data-transcriptid={transcript?.id}
            >
              <h2 className="text-lg font-semibold mb-2">
                Syllabus: {transcript?.syllabus?.name}
              </h2>

              <p className="text-gray-600">
                Views: {transcript?.viewsNum.toString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MostViewedTranscripts
