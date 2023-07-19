"use client"

import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

import LoadingComponent from "@/components/dashboard/Loading"
import Sentences from "@/components/search/Sentences"
import PostTable from "@/components/search/SearchPostTable"

const fetchPosts = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch posts")
  }

  return response.json()
}

const SearchPage = () => {
  const search = useSearchParams()
  const searchQuery = search ? search.get("q") : null
  const router = useRouter()

  const encodedSearchQuery = encodeURI(searchQuery || "")

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  )

  if (!encodedSearchQuery) {
    router.push("/")
  }

  if (isLoading) {
    return <LoadingComponent />
  }

  if (!data || data.length === 0) {
    return <div>No results found for: {searchQuery}</div>
  }

   return (
       <div className="mt-8 p-4">
      <span className="text-2xl font-semibold">
        Showing results for:{" "}
        <span className="text-red-500">{searchQuery}</span>
      </span>
      <PostTable posts={data} />
    </div>

  );
};

export default SearchPage
