"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  MostViewedTranscriptions,
  Transcription,
} from "@/lib/mostViewedTranscriptions"
import { viewTranscription } from "@/lib/viewTranscription"

const MostViewedTranscripts= () => {
  const [transcriptions, setTranscriptions] = useState<Transcription[] | null>(
    null
  )
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTranscriptions() {
      try {
        const fetchedTranscriptions = await MostViewedTranscriptions()
        setTranscriptions(fetchedTranscriptions)
        setLoading(false)
      } catch (error) {
        setError("Failed to fetch most viewed transcriptions")
        setLoading(false)
      }
    }

    fetchTranscriptions()
  }, [])

  const router = useRouter()

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    const postId = Number(event.currentTarget.dataset.postid)

    try {
      const updatedPost = await viewTranscription(postId)

      router.push(`/dashboard/posts/${postId}`)
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
            {transcriptions?.map((transcription) => (
              <Link
                key={transcription.post?.id}
                href={`/dashboard/posts/${transcription.post?.id}`}
                className="bg-white shadow-md p-4 rounded-md block"
                onClick={handleClick}
                data-postid={transcription.post?.id}
              >
                <h2 className="text-lg font-semibold mb-2">
                  Syllabus: {transcription?.post?.syllabus?.name}
                </h2>

                <p className="text-gray-600">
                  Views: {transcription.post?.viewsNum}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

  )
}

export default MostViewedTranscripts
