"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

import { getMostVotedTranscripts, Transcript } from "@/lib/mostVotedTranscripts"

const MostVotedTranscripts = () => {
  const [transcripts, setTranscripts] = useState<Transcript[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTranscripts() {
      try {
        const fetchedTranscripts = await getMostVotedTranscripts()
        setTranscripts(fetchedTranscripts)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch most voted transcripts")
        setLoading(false)
      }
    }

    fetchTranscripts()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Most Voted</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
          {transcripts?.map((transcript) => (
            <Link
              key={transcript?.id}
              href={`/dashboard/transcripts/${transcript?.id}`}
              className="bg-white shadow-md p-4 rounded-md block"
            >
              <h2 className="text-lg font-semibold mb-2">
                Syllabus: {transcript?.syllabus?.name}
              </h2>

              <p className="text-gray-600">
                Votes: {transcript?.votesNum.toString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MostVotedTranscripts
