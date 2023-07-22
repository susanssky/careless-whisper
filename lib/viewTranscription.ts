interface Post {
  id: number
  viewsNum: number | null
}

export async function viewTranscription(postId: number): Promise<Post | null> {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (response.ok) {
      const updatedPost = await response.json()
      // console.log("API Response:", updatedPost)
      return updatedPost as Post
    } else {
      throw new Error("Failed to increment views")
    }
  } catch (error) {
    console.error("Failed to increment views:", error)
    return null
  }
}
