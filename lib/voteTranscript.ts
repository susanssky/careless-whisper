interface Transcript {
  id: number
  votesNum: number | null
}
export async function voteTranscript(
  transcriptId: number,
  userId: string
): Promise<Transcript | null> {
  try {
    const response = await fetch(
      `/api/vote/upvote?transcriptId=${transcriptId}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.ok) {
      const updatedTranscript = await response.json()
      return updatedTranscript as Transcript
    } else {
      throw new Error("Failed to vote")
    }
  } catch (error) {
    console.error("Failed to vote:", error)
    return null
  }
}

export async function cancelVoteTranscript(
  transcriptId: number,
  userId: string
): Promise<Transcript | null> {
  try {
    const response = await fetch(
      `/api/vote/cancel-vote?transcriptId=${transcriptId}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.ok) {
      const canceledTranscript = await response.json()
      return canceledTranscript as Transcript
    } else {
      throw new Error("Failed to cancel vote")
    }
  } catch (error) {
    console.error("Failed to cancel vote:", error)
    return null
  }
}
