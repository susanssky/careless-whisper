"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons"

import { deleteTranscript } from "@/lib/deleteTranscript"
import { updateTranscript } from "@/lib/updateTranscript"
import { cancelVoteTranscript, voteTranscript } from "@/lib/voteTranscript"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FeedbackArea from "@/components/Transcript/FeedbackArea"

type TranscriptComponentProps = {
  transcript: TranscriptType
  session: any
}

export default function TranscriptComponent({
  transcript,
  session,
}: TranscriptComponentProps) {
  const router = useRouter()

  const {
    id,
    cohort,
    syllabus,
    sessionName,
    leaderName,
    originalVideoLink,
    duration,
    viewsNum,
    votesNum,
    user,
    sentences,
    summary,
  } = transcript

  // console.log(originalVideoLink)

  const article = sentences
    .map((sentence: { content: string }) => sentence.content)
    .join(" ")

  const [voted, setVoted] = useState(() => {
    const hasVoted = localStorage.getItem(`voted_${id}_${session.user.id}`)
    return hasVoted ? true : false
  })

  const [error, setError] = useState("")

  const handleVote = async () => {
    if (!voted) {
      alert("You have already voted. Thank you for your participation!")
    }
    try {
      const updatedTranscript = await voteTranscript(id, session.user.id)
      if (!updatedTranscript) {
        throw new Error("Failed to vote. Please try again.")
      }
      setVoted(true)
      localStorage.setItem(`voted_${id}_${session.user.id}`, "true")
      alert("Thank you for voting!")
      setError("")
      router.refresh()
    } catch (error: any) {
      console.error("Failed to vote:", error)
      setError(error.message)
    }
  }

  const handleCancelVote = async () => {
    if (voted) {
      try {
        const canceledTranscript = await cancelVoteTranscript(
          id,
          session.user.id
        )
        if (canceledTranscript) {
          setVoted(false)
          localStorage.removeItem(`voted_${id}_${session.user.id}`)
          alert("Your vote has been cancelled.")
          setError("")
          router.refresh()
        } else {
          setError("Failed to cancel vote. Please try again.")
        }
      } catch (error) {
        console.error("Failed to cancel vote:", error)
        setError("Failed to cancel vote. Please try again.")
      }
    } else {
      alert("You have not voted yet.")
    }
  }

  const handleDelete = async (transcriptId: number) => {
    // console.log(transcriptId)
    const success = await deleteTranscript(transcriptId.toString())
    if (!success) {
      console.error("Failed to delete transcript")
    }
    router.push("/dashboard")
    router.refresh()
  }

  const [edit, setEdit] = useState(false)

  const [transcriptData, setTranscriptData] = useState({
    cohortName: transcript.cohort.name,
    syllabusName: transcript.syllabus.name,
    sessionName: transcript.sessionName || "",
    leaderName: transcript.leaderName || "",
    summary: transcript.summary || "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setTranscriptData({ ...transcriptData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const success = await updateTranscript(
        transcript.id.toString(),
        transcriptData
      )
      if (!success) {
        setError("Failed to update transcript. Please try again.")
      }
      setEdit(false)
      router.refresh()
    } catch (error) {
      console.error("Failed to update transcript:", error)
      setError("Failed to update transcript. Please try again.")
    }
  }

  const handleEditClick = () => {
    setEdit(true)
  }

  if (!transcript) {
    return <div>Loading...</div>
  }

  return (
    <>
      {edit ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow p-4 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="cohortName"
              className="block text-sm font-medium text-gray-700"
            >
              Cohort Name:
            </label>
            <input
              type="text"
              name="cohortName"
              id="cohortName"
              value={transcriptData.cohortName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="syllabusName"
              className="block text-sm font-medium text-gray-700"
            >
              Syllabus Name:
            </label>
            <input
              type="text"
              name="syllabusName"
              id="syllabusName"
              value={transcriptData.syllabusName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="sessionName"
              className="block text-sm font-medium text-gray-700"
            >
              Session Name:
            </label>
            <input
              type="text"
              name="sessionName"
              id="sessionName"
              value={transcriptData.sessionName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="leaderName"
              className="block text-sm font-medium text-gray-700"
            >
              Leader Name:
            </label>
            <input
              type="text"
              name="leaderName"
              id="leaderName"
              value={transcriptData.leaderName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="summary"
              className="block text-sm font-medium text-gray-700"
            >
              Summary:
            </label>
            <textarea
              name="summary"
              id="summary"
              value={transcriptData.summary}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button type="submit">Save</Button>
            <Button onClick={() => setEdit(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-center gap-4">
            <Button asChild variant="destructive">
              <Link href="/dashboard">Back to the dashboard</Link>
            </Button>
            {session?.user.role === "Mentor" && (
              <>
                <Button onClick={handleEditClick}>Edit</Button>
                <Button onClick={() => handleDelete(id)}>Delete</Button>
              </>
            )}
            <Button onClick={handleVote} disabled={voted}>
              <ThickArrowUpIcon className="mr-2 h-4 w-4" />
              {voted ? "Voted" : "Vote"}
            </Button>

            <Button onClick={handleCancelVote} disabled={!voted}>
              <ThickArrowDownIcon className="mr-2 h-4 w-4" />
              {voted ? "Cancel Vote" : "Not Voted"}
            </Button>
            <FeedbackArea
              transcriptId={transcript.id}
              userId={session.user.id}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>
                {cohort.name}{" "}
                {syllabus.link ? (
                  <Link href={syllabus.link} target="_blank">
                    {syllabus.name}
                  </Link>
                ) : (
                  <span>{syllabus.name}</span>
                )}
                <br />
                <p className="text-base">
                  {sessionName} by {leaderName}
                </p>
              </CardTitle>

              <CardDescription>
                {originalVideoLink && (
                  <>
                    Video:
                    <Link href={originalVideoLink} target="_blank">
                      {originalVideoLink}
                    </Link>
                  </>
                )}
                <div className="flex justify-start gap-2">
                  <Badge>duration: {duration}min(s)</Badge>
                  <Badge>views: {viewsNum}</Badge>{" "}
                  <Badge>votes: {votesNum}</Badge>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion
                type="single"
                defaultValue={summary ? "summary" : "transcript"}
                collapsible
              >
                {summary && (
                  <AccordionItem value="summary">
                    <AccordionTrigger>Summary:</AccordionTrigger>
                    <AccordionContent>
                      <p className="select-none">{summary}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
                <AccordionItem value="transcript">
                  <AccordionTrigger>Transcript:</AccordionTrigger>
                  <AccordionContent>
                    <p className="select-none">{article}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter>Uploader: {user.name}</CardFooter>
          </Card>
        </>
      )}
    </>
  )
}
