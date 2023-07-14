"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ThickArrowUpIcon } from "@radix-ui/react-icons"

import { deletePost } from "@/lib/deletePost"
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

type PostComponentProps = {
  post: PostType
  session: any
}
export default function PostComponent({ post, session }: PostComponentProps) {
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
    transcription,
    summary,
  } = post

  const article = transcription.sentences
    .map((sentence: { content: string }) => sentence.content)
    .join(" ")
  const handleDelete = async (postId: number) => {
    const success = await deletePost(postId.toString())

    if (success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      console.error("Failed to delete post")
    }
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <>
      <div className="flex justify-center gap-4">
        <Button asChild variant="destructive">
          <Link href="/dashboard">Back to the dashboard</Link>
        </Button>
        {session?.user.role === "Mentor" && (
          <>
            <Button asChild>
              <Link href="">Edit</Link>
            </Button>
            <Button onClick={() => handleDelete(id)}>Delete</Button>
          </>
        )}

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
