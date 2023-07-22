"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";



import LoadingComponent from "@/components/dashboard/Loading";
import SearchPostTable from "@/components/search/SearchPostTable";





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
    `/api/asearch?user=${encodedSearchUser}&keywords=${encodeURIComponent(
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
      <div>
        <NoResultsMessage displayedParams={displayedParams} />
      </div>
    )
  }

  return (
    <div className="mt-8 p-4">
      <span className="text-2xl font-semibold">
        Showing results for:{" "}
        <span className="text-red-500">{displayedParams}</span>
      </span>
      <SearchPostTable posts={data} />
    </div>
  )
}

export default AdvancedSearchPage