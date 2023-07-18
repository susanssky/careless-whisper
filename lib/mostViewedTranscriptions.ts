
export interface Transcription {
  id: number
  post: Post | null
}

export interface Post {
  id: number
  viewsNum: number
  leaderName: string       
  syllabus: Syllabus
}

export interface Syllabus {
   name : String  
}

export async function MostViewedTranscriptions(): Promise<Transcription[] | null> {
  try {
    const response = await fetch(`api/transcriptions/most-viewed`, {
      method: "GET", 
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const transcriptions = await response.json();
      console.log("API Response:", transcriptions);
      return transcriptions as Transcription[];
    } else {
      throw new Error("Failed to fetch most viewed transcriptions");
    }
  } catch (error) {
    console.error("Failed to fetch most viewed transcriptions:", error);
    return null;
  }
}
