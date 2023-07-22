"use client"
import React, { useState } from "react"

import { submitFeedback } from "@/lib/feedbackTranscription"
import { Button } from "@/components/ui/button"

type FeedbackAreaProps = {
  postId: number
  userId: string
}

const FeedbackArea = ({ postId, userId }: FeedbackAreaProps) => {
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
      const response = await submitFeedback(postId, userId, feedbackText)
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

  return (
    <div>
      <Button onClick={toggleFeedbackArea}>Feedback</Button>
      {showFeedback && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black opacity suffix">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <textarea
              className="w-full h-48 p-4 border border-gray-300 rounded-lg mb-4 resize-none"
              placeholder="Enter your feedback here..."
              value={feedbackText}
              onChange={handleFeedbackChange}
            />
            <div className="flex justify-end">
              <Button className="mr-2" onClick={toggleFeedbackArea}>
                Cancel
              </Button>
              <Button onClick={handleSubmitFeedback}>Submit</Button>
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
