"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";



import Sentences from "@/components/Sentences";



import Spinner from "./Spinner";


const fetchSearchResults = async (url: string) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Failed to fetch search results")
  }

  return response.json()
}

const AdvancedSearchPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const searchUser = searchParams ? searchParams.get("user") : null
  const searchKeyword = searchParams ? searchParams.get("keywords") : null
  const searchCategory = searchParams ? searchParams.get("category") : null
  const searchSyllabusModule = searchParams
    ? searchParams.get("syllabusModule")
    : null
  const searchDuration = searchParams ? searchParams.get("duration") : null

  const encodedSearchUser = encodeURI(searchUser || "")
  const encodedSearchKeyword = searchKeyword ? `"${encodeURIComponent(searchKeyword)}"` : "";

  const encodedSearchCategory = encodeURI(searchCategory || "")
  const encodedSearchSyllabusModule = encodeURI(searchSyllabusModule || "")
  const encodedSearchDuration = encodeURI(searchDuration || "")

  const { data, isLoading } = useSWR(
    `/api/asearch?user=${encodedSearchUser}&keywords=${encodedSearchKeyword}&category=${encodedSearchCategory}&syllabusModule=${encodedSearchSyllabusModule}&duration=${encodedSearchDuration}`,
    fetchSearchResults,
    { revalidateOnFocus: false }
  )

  if (isLoading) {
    return <Spinner />
  }

  const submittedParams = {
    User: searchUser,
    Keywords: searchKeyword,
    Category: searchCategory,
    "Syllabus Module": searchSyllabusModule,
    Duration: searchDuration,
  }

  const displayedParams = Object.entries(submittedParams).map(
    ([key, value]) => {
      if (value) {
        return (
          <li key={key}>
            {key}: <span className="font-semibold">{value}</span>
          </li>
        )
      }
      return null
    }
  )

  return (
    <>
      <span className="text-xl">Showing results for:</span>
      <ul>{displayedParams}</ul>
      {data && <Sentences sentences={data} />} {/* Add conditional check */}
    </>
  )
}

export default AdvancedSearchPage