export async function deletePost(postId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/post/${postId}`, {
      method: "DELETE",
    })

    if (response.ok) {
      return true
    } else {
      throw new Error("Failed to delete post")
    }
  } catch (error) {
    console.error("Failed to delete post:", error)
    return false
  }
}
