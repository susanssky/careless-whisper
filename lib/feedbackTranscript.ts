export async function submitFeedback(
  transcriptId: number,
  userId: string,
  feedbackText: string
): Promise<any> {
  try {
    const response = await fetch(
      `/api/feedback?transcriptId=${transcriptId}&userId=${userId}&feedbackText=${encodeURIComponent(
        feedbackText
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.ok) {
      return await response.json()
    } else {
      throw new Error("Failed to submit feedback")
    }
  } catch (error) {
    console.error("Failed to submit feedback:", error)
    return null
  }
}
