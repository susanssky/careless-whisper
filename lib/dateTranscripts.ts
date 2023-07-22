export interface Transcription {
  id: number
  post: Post | null
createdAt: Date
}

export interface Post {
  id: number
  votesNum: number
  leaderName: string
  syllabus: Syllabus
}

export interface Syllabus {
  name: string
}

export async function MostRecentTranscriptions(): Promise<
  Transcription[] | null
> {
  try {
    const response = await fetch(`api/transcriptions/most-recent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const transcriptions = await response.json()
      console.log("API Response:", transcriptions)
      return transcriptions as Transcription[]
    } else {
      throw new Error("Failed to fetch most recent transcriptions")
    }
  } catch (error) {
    console.error("Failed to fetch most recent transcriptions:", error)
    return null
  }
}
