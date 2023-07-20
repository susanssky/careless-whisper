"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";



import { deletePost } from "@/lib/deletePost";
import { updatePost } from "@/lib/updatePost";
import { cancelVoteTranscription, voteTranscription } from "@/lib/voteTranscription";
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
        router.refresh()
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

const handleCancelVote = async () => {
  if (voted) {
    try {
      const canceledPost = await cancelVoteTranscription(id, session.user.id)
      if (canceledPost) {
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
         <form onSubmit={handleSubmit} className="bg-white rounded shadow p-4 mb-4">
     <div className="mb-4">
            <label htmlFor="cohortName" className="block text-sm font-medium text-gray-700">
              Cohort Name:
            </label>
            <input
              type="text"
              name="cohortName"
              id="cohortName"
              value={postData.cohortName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
                 <div className="mb-4">
            <label htmlFor="syllabusName" className="block text-sm font-medium text-gray-700">
              Syllabus Name:
            </label>
            <input
              type="text"
              name="syllabusName"
              id="syllabusName"
              value={postData.syllabusName}
              onChange={handleInputChange}
              className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
          <label htmlFor="sessionName" className="block text-sm font-medium text-gray-700">
            Session Name:
          </label>
          <input
            type="text"
            name="sessionName"
            id="sessionName"
            value={postData.sessionName}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
            <div className="mb-4">
          <label htmlFor="leaderName" className="block text-sm font-medium text-gray-700">
            Leader Name:
          </label>
          <input
            type="text"
            name="leaderName"
            id="leaderName"
            value={postData.leaderName}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
            Summary:
          </label>
          <textarea
            name="summary"
            id="summary"
            value={postData.summary}
            onChange={handleInputChange}
            className="mt-1 px-3 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
            <div className="flex justify-end space-x-4">
          <Button type="submit" >
            Save
          </Button>
          <Button onClick={() => setEdit(false)} >
            Cancel
          </Button>
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