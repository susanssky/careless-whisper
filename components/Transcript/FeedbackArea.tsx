"use client"

import React, { useState } from "react"

import { submitFeedback } from "@/lib/feedbackTranscript"
import { Button } from "@/components/ui/button"

import { Textarea } from "../ui/textarea"

type FeedbackAreaProps = {
  transcriptId: number
  userId: string
}

const FeedbackArea = ({ transcriptId, userId }: FeedbackAreaProps) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(
    null
  )

  const toggleFeedbackArea = () => {
    setShowFeedback((prev) => !prev)
    setFeedbackText("")
    setSubmittedFeedback(null)
  }

  const handleFeedbackChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFeedbackText(event.target.value)
  }

  const handleSubmitFeedback = async () => {
    try {
      const response = await submitFeedback(transcriptId, userId, feedbackText)
      if (response) {
        setFeedbackText("")
        setShowFeedback(false)
        setSubmittedFeedback("Thank you for your feedback!")

        setTimeout(() => {
          setSubmittedFeedback(null)
        }, 3000)
      } else {
        throw new Error("Failed to submit feedback")
      }
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      setSubmittedFeedback("Failed to submit feedback. Please try again.")
    }
  }
  const buttonStyle: string =
    "flex gap-2 h-7 rounded dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"

  return (
    <div>
      <Button onClick={toggleFeedbackArea} className={buttonStyle}>
        Feedback
      </Button>
      {showFeedback && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black opacity suffix">
          <div className="bg-[#c8c8c8] dark:bg-[#27272a] p-8 rounded-lg shadow-lg w-96">
            <Textarea
              className="w-full h-48 p-4 border border-gray-300 dark:bg-[#1f1f1f] rounded-lg mb-4 resize-none"
              placeholder="Enter your feedback here..."
              value={feedbackText}
              onChange={handleFeedbackChange}
            />
            <div className="flex justify-end">
              <Button className={buttonStyle} onClick={toggleFeedbackArea}>
                Cancel
              </Button>
              <Button
                className="flex gap-2 h-7 rounded dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black ml-1"
                onClick={handleSubmitFeedback}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}

      {submittedFeedback && (
        <div className="fixed inset-x-0 bottom-10 flex justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p>{submittedFeedback}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackArea
