export async function updatePost(
  postId: string,
  postData: any
): Promise<boolean> {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })

    if (response.ok) {
      return true
    } else {
      throw new Error("Failed to update post")
    }
  } catch (error) {
    console.error("Failed to update post:", error)
    return false
  }
}
