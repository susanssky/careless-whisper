export interface Transcript {
  id: number
  syllabus: Syllabus
  createdAt: Date
}

export interface Syllabus {
  name: string
}

export async function getMostRecentTranscripts(): Promise<Transcript[] | null> {
  try {
    const response = await fetch(`api/transcripts/most-recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const transcripts = await response.json()
      console.log("API Response:", transcripts)
      return transcripts as Transcript[]
    } else {
      throw new Error("Failed to fetch most recent transcripts")
    }
  } catch (error) {
    console.error("Failed to fetch most recent transcripts:", error)
    return null
  }
}
