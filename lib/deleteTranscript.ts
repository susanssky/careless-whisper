export async function deleteTranscript(transcriptId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/transcript/${transcriptId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      return true
    } else {
      throw new Error("Failed to delete transcript")
    }
  } catch (error) {
    console.error("Failed to delete transcript:", error)
    return false
  }
}
