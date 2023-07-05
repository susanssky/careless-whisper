import React from "react"
import Link from "next/link"
import { ThickArrowUpIcon } from "@radix-ui/react-icons"

import getPost from "@/lib/getPost"
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

type TranscriptDetailsProps = {
  params: { postId: string }
}
export default async function TranscriptDetails({
  params: { postId },
}: TranscriptDetailsProps) {
  const postData: Promise<PostType> = getPost(postId)
  const post = await postData
  const {
    cohort,
    syllabus,
    sessionName,
    leaderName,
    originalVideoLink,
    duration,
    viewsNum,
    votesNum,
    user,
    transcription,
  } = post
  const article = transcription.sentences
    .map((sentence: { content: string }) => sentence.content)
    .join(" ")
  return (
    <>
      <div className="flex justify-center gap-4">
        <Button asChild variant="destructive">
          <Link href="/dashboard">Back to the dashboard</Link>
        </Button>
        <Button asChild>
          <Link href="">Edit</Link>
        </Button>
        <Button asChild>
          <Link href="">Delete</Link>
        </Button>
        <Button>
          <ThickArrowUpIcon className="mr-2 h-4 w-4" />
          vote
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            <p>
              {cohort.name} {syllabus.name}
            </p>
            <p>
              {sessionName} by {leaderName}
            </p>
          </CardTitle>
          <CardDescription>
            {originalVideoLink && <p>Video: {originalVideoLink}</p>}
            <p className="flex justify-start gap-2">
              <Badge>duration: {duration}min(s)</Badge>
              <Badge>views: {viewsNum}</Badge> <Badge>votes: {votesNum}</Badge>
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <b>Transcription:</b>
          <p className="select-none">{article}</p>
        </CardContent>
        <CardFooter>
          <p>Uploader: {user.name}</p>
        </CardFooter>
      </Card>
    </>
  )
}
