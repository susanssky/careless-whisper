"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Pencil1Icon,
  ThickArrowDownIcon,
  ThickArrowUpIcon,
  TrashIcon,
} from "@radix-ui/react-icons"

import { deleteTranscript } from "@/lib/deleteTranscript"
import { updateTranscript } from "@/lib/updateTranscript"
import { cancelVoteTranscript, voteTranscript } from "@/lib/voteTranscript"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

  const sentencesByFiveMinutes: string[][] = transcript.sentences.reduce(
    (acc: string[][], sentence) => {
      const startTime = sentence.startTime
      const content = sentence.content
      const minutes = Math.floor(Number(startTime.slice(3, 5)) / 5)

      if (!acc[minutes]) {
        acc[minutes] = []
      }
      acc[minutes].push(content)

      return acc
    },
    []
  )

  // const article = sentences
  //   .map((sentence: { content: string }) => sentence.content)
  //   .join(" ")

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
  const buttonStyle: string =
    "flex gap-2 h-7 rounded dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"
  const iconStyle: string = "h-4 w-4"

  return (
    <>
      <section className="grow p-4 flex flex-col gap-3">
        {edit && (
          <form
            onSubmit={handleSubmit}
            className="mb-4 bg-[#c8c8c8] dark:bg-[#27272a] p-4 rounded-lg"
          >
            <div className="mb-4">
              <Label
                htmlFor="cohortName"
                // className="block text-sm font-medium text-gray-700"
              >
                Cohort Name:<span className="text-red-500">*</span>
              </Label>
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
              <Label
                htmlFor="syllabusName"
                // className="block text-sm font-medium text-gray-700"
              >
                Syllabus Name:<span className="text-red-500">*</span>
              </Label>
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
              <Label
                htmlFor="sessionName"
                // className="block text-sm font-medium text-gray-700"
              >
                Session Name:<span className="text-red-500">*</span>
              </Label>
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
              <Label
                htmlFor="leaderName"
                // className="block text-sm font-medium text-gray-700"
              >
                Leader Name:<span className="text-red-500">*</span>
              </Label>
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
              <Label
                htmlFor="summary"
                // className="block text-sm font-medium text-gray-700"
              >
                Summary:
              </Label>
              <Textarea
                name="summary"
                id="summary"
                value={transcriptData.summary}
                onChange={handleInputChange}
                className=" bg-white dark:bg-[#1f1f1f]"
                // className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button type="submit" className={buttonStyle}>
                Save
              </Button>
              <Button onClick={() => setEdit(false)} className={buttonStyle}>
                Cancel
              </Button>
            </div>
          </form>
        )}
        <div className="grid gap-4">
          {/* top information section */}
          <div className="grid grid-cols-[auto_100px] md:grid-cols-[auto_200px] gap-y-2 bg-[#c8c8c8] dark:bg-[#27272a] p-4 rounded-lg">
            <div className="">
              <h2 className="pb-2 text-3xl font-lora font-semibold transition-colors">
                {cohort.name} :{" "}
                <Link
                  href={syllabus.link}
                  target="_blank"
                  className="hover:underline"
                >
                  {syllabus.name}
                </Link>
              </h2>
              <hr className="w-[100%] border-black dark:border-[#808080]" />
              <h3 className="text-2xl font-lora font-semibold dark:text-[#7f8ea3]">
                {sessionName}
              </h3>
              {originalVideoLink && (
                <p className="leading-7">
                  <Link
                    href={originalVideoLink}
                    target="_blank"
                    className="hover:underline"
                  >
                    {originalVideoLink}
                  </Link>
                </p>
              )}
              <h4 className="text-sm font-semibold">
                <span>Uploaded By:</span>
                <span>{user.name}</span>
              </h4>
            </div>
            <div className="row-span-2 flex flex-col justify-center gap-2 border-l border-black dark:border-[#808080] pl-4">
              <p className="flex flex-col text-sm">
                <span className="font-semibold text-xs dark:text-[#7f8ea3]">
                  Leader:
                </span>
                <span>{leaderName}</span>
              </p>
              <p className="flex flex-col text-sm">
                <span className="font-semibold text-xs dark:text-[#7f8ea3]">
                  Duration:
                </span>
                <span>{duration}min(s)</span>
              </p>
              <p className="flex flex-col text-sm">
                <span className="font-semibold text-xs dark:text-[#7f8ea3]">
                  Views:
                </span>
                <span>{viewsNum}</span>
              </p>
              <p className="flex flex-col text-sm">
                <span className="font-semibold text-xs dark:text-[#7f8ea3]">
                  Votes:
                </span>
                <span>{votesNum}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {session?.user.role === "Mentor" && (
                <>
                  <Button onClick={handleEditClick} className={buttonStyle}>
                    <Pencil1Icon className={iconStyle} />
                    <span>Edit</span>
                  </Button>
                  <Button
                    onClick={() => handleDelete(id)}
                    className={buttonStyle}
                  >
                    <TrashIcon className={iconStyle} />
                    <span>Delete</span>
                  </Button>
                </>
              )}
              <Button
                onClick={handleVote}
                disabled={voted}
                className={buttonStyle}
              >
                <ThickArrowUpIcon className={iconStyle} />
                {voted ? <span>Voted</span> : <span>Voted</span>}
              </Button>
              <Button
                onClick={handleCancelVote}
                disabled={!voted}
                className={buttonStyle}
              >
                <ThickArrowDownIcon className="mr-2 h-4 w-4" />
                {voted ? "Cancel Vote" : "Not Voted"}
              </Button>
              <FeedbackArea
                transcriptId={transcript.id}
                userId={session.user.id}
              />
            </div>
          </div>

          {/* summary section */}
          {summary && (
            <section className="flex flex-col gap-4 p-4 rounded-lg bg-[#c8c8c8] dark:bg-[#313133]">
              <h3 className="text-2xl font-lora font-semibold text-red-500">
                Summary:
              </h3>
              <p className="select-none border-t pt-4">{summary}</p>
            </section>
          )}

          {/* transcript section */}
          <section className="flex flex-col gap-4 p-4 rounded-lg bg-[#c8c8c8] dark:bg-[#313133]">
            <h3 className="text-2xl font-lora font-semibold text-red-500">
              Transcript:
            </h3>
            <div className="flex flex-col gap-8 select-none">
              {sentencesByFiveMinutes.map(
                (fiveMinutes: string[], index: number) => {
                  const contentString = fiveMinutes.join(" ")
                  const timeStartString = `${index * 5}`
                  const timeEndString = `${index * 5 + 5}`

                  return (
                    <div className="flex gap-4 border-t pt-4">
                      <p className="text-center">
                        <span className="font-semibold">
                          {timeStartString}
                          <br />
                          {"-"}
                          <br />
                          {timeEndString}
                        </span>{" "}
                        <span className="text-xs dark:text-[#7f8ea3]">
                          minutes
                        </span>
                      </p>
                      <p className="text-sm">{contentString}</p>
                    </div>
                  )
                }
              )}
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
