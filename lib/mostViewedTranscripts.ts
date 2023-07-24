export interface Transcript {
  id: number
  syllabus: Syllabus
  viewsNum: Number
}

export interface Syllabus {
  name: string
}

export async function getMostViewedTranscripts(): Promise<Transcript[] | null> {
  try {
    const response = await fetch(`api/transcripts/most-viewed`, {
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
      throw new Error("Failed to fetch most viewed transcripts")
    }
  } catch (error) {
    console.error("Failed to fetch most viewed transcripts:", error)
    return null
  }
}
