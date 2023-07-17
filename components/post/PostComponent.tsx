"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThickArrowUpIcon } from "@radix-ui/react-icons";



import { deletePost } from "@/lib/deletePost";
import { updatePost } from "@/lib/updatePost";
import { voteTranscription } from "@/lib/voteTranscription";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";





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

  console.log(originalVideoLink)

  const article = transcription.sentences
    .map((sentence: { content: string }) => sentence.content)
    .join(" ")

  const [voted, setVoted] = useState(() => {
    const hasVoted = localStorage.getItem(`voted_${id}_${session.user.id}`);
    return hasVoted ? true : false;
  });

  const [error, setError] = useState("");


const handleVote = async () => {
  if (!voted) {
    try {
      const updatedPost = await voteTranscription(id, session.user.id)
      if (updatedPost) {
        setVoted(true)
        localStorage.setItem(`voted_${id}_${session.user.id}`, "true")
      
        alert("Thank you for voting!")
        setError("")
      } else {
        setError("Failed to vote. Please try again.")
      }
    } catch (error) {
      console.error("Failed to vote:", error)
      setError("Failed to vote. Please try again.")
    }
  } else {
  
    alert("You have already voted. Thank you for your participation!")
  }
}

  const handleDelete = async (postId: number) => {
    const success = await deletePost(postId.toString())

    if (success) {
      router.push("/dashboard")
      router.refresh()
    } else {
      console.error("Failed to delete post")
    }
  }

  const [edit, setEdit] = useState(false)

  const [postData, setPostData] = useState({
    cohortName: post.cohort.name,
    syllabusName: post.syllabus.name,
    sessionName: post.sessionName || "",
    leaderName: post.leaderName || "",
    summary: post.summary || "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setPostData({ ...postData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const success = await updatePost(post.id.toString(), postData)
      if (success) {
        setEdit(false)
      } else {
        setError("Failed to update post. Please try again.")
      }
    } catch (error) {
      console.error("Failed to update post:", error)
      setError("Failed to update post. Please try again.")
    }
  }

  const handleEditClick = () => {
    setEdit(true)
  }

  if (!post) {
    return <div>Loading...</div>
  }

  return (
    <>
      {edit ? (
        <form onSubmit={handleSubmit}>
          <label>
            Cohort Name:
            <input
              type="text"
              name="cohortName"
              value={postData.cohortName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Syllabus Name:
            <input
              type="text"
              name="syllabusName"
              value={postData.syllabusName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Session Name:
            <input
              type="text"
              name="sessionName"
              value={postData.sessionName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Leader Name:
            <input
              type="text"
              name="leaderName"
              value={postData.leaderName}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Summary:
            <textarea
              name="summary"
              value={postData.summary}
              onChange={handleInputChange}
            />
          </label>
          <Button type="submit">Save</Button>
          <Button onClick={() => setEdit(false)}>Cancel</Button>
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
      )}
    </>
  )
}