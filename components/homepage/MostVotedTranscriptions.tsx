"use client";

import React, { useEffect, useState } from "react"
import Link from "next/link"

import {
  MostVotedTranscriptions,
  Transcription,
} from "@/lib/mostVotedTranscriptions"

const MostVotedTranscripts = () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTranscriptions() {
      try {
        const fetchedTranscriptions = await MostVotedTranscriptions()
        setTranscriptions(fetchedTranscriptions)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch most voted transcriptions")
        setLoading(false)
      }
    }

    fetchTranscriptions()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div>
        <h1 className="text-3xl font-bold mb-4">Most Voted</h1>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-1">
          {transcriptions?.map((transcription) => (
            <Link
              key={transcription.post?.id}
              href={`/dashboard/posts/${transcription.post?.id}`}
              className="bg-white shadow-md p-4 rounded-md block"
            >
              <h2 className="text-lg font-semibold mb-2">
                Syllabus: {transcription?.post?.syllabus?.name}
              </h2>

              <p className="text-gray-600">
                Votes: {transcription.post?.votesNum}{" "}
              
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MostVotedTranscripts