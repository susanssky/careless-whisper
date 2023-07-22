export interface Transcription {
  id: number
  post: Post | null
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

export async function MostVotedTranscriptions(): Promise<
  Transcription[] | null
> {
  try {
    const response = await fetch(`api/transcriptions/most-voted`, {
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
      throw new Error("Failed to fetch most voted transcriptions")
    }
  } catch (error) {
    console.error("Failed to fetch most voted transcriptions:", error)
    return null
  }
}
