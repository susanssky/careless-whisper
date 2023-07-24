export interface Transcript {
  id: number
  syllabus: Syllabus
  votesNum: Number
}

export interface Syllabus {
  name: string
}

export async function getMostVotedTranscripts(): Promise<Transcript[] | null> {
  try {
    const response = await fetch(`api/transcripts/most-voted`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const transcripts = await response.json()
      // console.log("API Response:", transcripts)
      return transcripts as Transcript[]
    } else {
      throw new Error("Failed to fetch most voted transcripts")
    }
  } catch (error) {
    console.error("Failed to fetch most voted transcripts:", error)
    return null
  }
}
