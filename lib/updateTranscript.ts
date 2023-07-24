export async function updateTranscript(
  transcriptId: string,
  transcriptData: any
): Promise<boolean> {
  try {
    const response = await fetch(`/api/transcript/${transcriptId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transcriptData),
    })

    if (response.ok) {
      return true
    } else {
      throw new Error("Failed to update transcript")
    }
  } catch (error) {
    console.error("Failed to update transcript:", error)
    return false
  }
}
