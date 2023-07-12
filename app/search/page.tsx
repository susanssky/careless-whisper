"use client"

import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

import Sentences from "@/components/search/Sentences"

import Spinner from "./Spinner"

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
    return <Spinner />
  }

  if (!data || data.length === 0) {
    return <div>No results found for: {searchQuery}</div>;
  }


  return (
    <>
      <span className="text-xl">
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      <Sentences sentences={data} />
    </>
  )
}

export default SearchPage
