"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";



import LoadingComponent from "@/components/dashboard/Loading";
import SearchPostTable from "@/components/search/SearchPostTable";





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

  const NoResultsMessage = ({
    searchQuery,
  }: {
    searchQuery: string | null
  }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-4xl text-gray-500 mb-4">😞</div>
        <div className="text-xl text-gray-600">
          Oops! No results found for:{" "}
          <span className="text-red-500">{searchQuery}</span>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          <Link href="/" className="text-red-500">
            search again
          </Link>{" "}
         
        </div>
      </div>
    )
  }

  if (!encodedSearchQuery) {
    router.push("/")
  }

  if (isLoading) {
    return <LoadingComponent />
  }

   if (!data || data.length === 0) {
    return <NoResultsMessage searchQuery={searchQuery} />;
  }

   return (
       <div className="mt-8 p-4">
      <span className="text-2xl font-semibold">
        Showing results for:{" "}
        <span className="text-red-500">{searchQuery}</span>
      </span>
      <SearchPostTable posts={data} />
    </div>

  );
};

export default SearchPage