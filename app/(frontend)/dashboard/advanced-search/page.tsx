"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import useSWR from "swr"

import LoadingComponent from "@/components/Dashboard/Loading"
import SearchPostTable from "@/components/Search/SearchPostTable"

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
  const searchLeader = searchParams ? searchParams.get("leader") : null
  const searchCohort = searchParams ? searchParams.get("cohort") : null
  const searchSyllabusModule = searchParams
    ? searchParams.get("syllabusModule")
    : null
  const searchDuration = searchParams ? searchParams.get("duration") : null

  const encodedSearchUser = encodeURI(searchUser || "")
  const encodedSearchKeyword = encodeURI(searchKeyword || "")
  const encodedSearchLeader = encodeURI(searchLeader || "")
  const encodedSearchCohort = encodeURI(searchCohort || "")
  const encodedSearchSyllabusModule = encodeURI(searchSyllabusModule || "")
  const encodedSearchDuration = encodeURI(searchDuration || "")

  const { data, isLoading } = useSWR(
    `/api/advanced-search?user=${encodedSearchUser}&keywords=${encodeURIComponent(
      encodedSearchKeyword
    )}&cohort=${encodedSearchCohort}&syllabusModule=${encodedSearchSyllabusModule}&duration=${encodedSearchDuration}&leader=${encodedSearchLeader}`,
    fetchSearchResults,
    { revalidateOnFocus: false }
  )

  if (isLoading) {
    return <LoadingComponent />
  }

  const submittedParams = {
    User: searchUser,
    Keywords: searchKeyword,
    Cohort: searchCohort,
    "Syllabus Module": searchSyllabusModule,
    Duration: searchDuration,
    Leader: searchLeader,
  }

  const displayedParams = Object.entries(submittedParams)
    .map(([key, value]) => {
      if (value) {
        return `${key}: ${value}`
      }
      return null
    })
    .filter(Boolean)
    .join(", ")

  const NoResultsMessage = ({
    displayedParams,
  }: {
    displayedParams: string
  }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-4xl text-gray-500 mb-4">😞</div>
        <div className="text-xl text-gray-600">
          Oops! No results found for:{" "}
          <span className="text-red-500">{displayedParams}</span>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          <Link href="/" className="text-red-500">
            search again
          </Link>{" "}
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <p className="font-lora font-semibold text-2xl p-4">
        No results found for: {displayedParams}
      </p>
    )
  }

  return (
    <section className="grow p-4">
      <span className="font-lora font-semibold text-2xl">
        Showing results for:{" "}
        <span className="text-red-500">{displayedParams}</span>
      </span>

      <hr className="dark:border dark:border-solid dark:border-zinc-800" />
      <SearchPostTable transcripts={data} />
    </section>
  )
}

export default AdvancedSearchPage
