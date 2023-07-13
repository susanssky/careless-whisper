"use client";

import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import LoadingComponent from "@/components/dashboard/Loading"


import Sentences from "@/components/search/Sentences";




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
  const searchCohort = searchParams ? searchParams.get("cohort") : null
  const searchSyllabusModule = searchParams
    ? searchParams.get("syllabusModule")
    : null
  const searchDuration = searchParams ? searchParams.get("duration") : null

  const encodedSearchUser = encodeURI(searchUser || "")
  const encodedSearchKeyword = encodeURI(searchKeyword || "")

  const encodedSearchCohort = encodeURI(searchCohort || "")
  const encodedSearchSyllabusModule = encodeURI(searchSyllabusModule || "")
  const encodedSearchDuration = encodeURI(searchDuration || "")

const { data, isLoading } = useSWR(
  `/api/asearch?user=${encodedSearchUser}&keywords=${encodeURIComponent(encodedSearchKeyword)}&cohort=${encodedSearchCohort}&syllabusModule=${encodedSearchSyllabusModule}&duration=${encodedSearchDuration}`,
  fetchSearchResults,
  { revalidateOnFocus: false }
)



  if (isLoading) {
    return <LoadingComponent />
  }

  const submittedParams = {
    User: searchUser,
    Keywords: searchKeyword,
    Category: searchCohort,
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

  if (!data || data.length === 0) {
    return <div>
      No results found for: {displayedParams}
      </div>
  }

  return (
    <>
      <span className="text-xl">Showing results for:</span>
      <ul>{displayedParams}</ul>
      {data && <Sentences sentences={data} />} 
    </>
  )
}
