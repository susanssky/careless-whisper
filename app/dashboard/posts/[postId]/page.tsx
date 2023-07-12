import React from "react"
import Link from "next/link"
import { ThickArrowUpIcon } from "@radix-ui/react-icons"

import { getPost } from "@/lib/helpers"
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


type TranscriptDetailsProps = {
  params: { postId: string }
}
export default async function TranscriptDetails({
  params: { postId },
}: TranscriptDetailsProps) {
  const post = await getPost(postId)
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
    transcription,
    summary,
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
              {cohort.name} {syllabus.name}
            <br />
            <p className="text-base">
              {sessionName} by {leaderName}
            </p>
          </CardTitle>
          <CardDescription>
            {originalVideoLink && `Video: ${originalVideoLink}`}
            <div className="flex justify-start gap-2">
              <Badge>duration: {duration}min(s)</Badge>
              <Badge>views: {viewsNum}</Badge> <Badge>votes: {votesNum}</Badge>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion
            type="single"
            defaultValue={summary ? "summary" : "transcription"}
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
            <AccordionItem value="transcription">
              <AccordionTrigger>Transcription:</AccordionTrigger>
              <AccordionContent>
                <p className="select-none">{article}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter>Uploader: {user.name}</CardFooter>
      </Card>
    </>
  )
}
