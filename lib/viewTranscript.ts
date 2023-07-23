interface Transcript {
  id: number
  viewsNum: number | null
}

export async function viewTranscript(
  transcriptId: number
): Promise<Transcript | null> {
  try {
    const response = await fetch(`/api/transcript/${transcriptId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const updatedTranscript = await response.json()
      // console.log("API Response:", updatedTranscript)
      return updatedTranscript as Transcript
    } else {
      throw new Error("Failed to increment views")
    }
  } catch (error) {
    console.error("Failed to increment views:", error)
    return null
  }
}
