interface Post {
  id: number
  votesNum: number | null
}
export async function voteTranscription(
  postId: number,
  userId: string
): Promise<Post | null> {
  try {
    const response = await fetch(
      `/api/vote/upvote?postId=${postId}&userId=${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (response.ok) {
      const updatedPost = await response.json()
      return updatedPost as Post
    } else {
      throw new Error("Failed to vote")
    }
  } catch (error) {
    console.error("Failed to vote:", error)
    return null
  }
}


export async function cancelVoteTranscription(
  postId: number,
  userId: string
): Promise<Post | null> {
  try {
    const response = await fetch(`/api/vote/cancel-vote?postId=${postId}&userId=${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const canceledPost = await response.json()
      return canceledPost as Post;
    } else {
      throw new Error("Failed to cancel vote");
    }
  } catch (error) {
    console.error("Failed to cancel vote:", error);
    return null;
  }
}
