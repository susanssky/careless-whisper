"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";





const SearchInput = () => {
  const search = useSearchParams()
  const [searchQuery, setSearchQuery] = useState<string | null>(
    search ? search.get("q") : ""
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const router = useRouter()

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()

    if (typeof searchQuery !== "string") {
      console.log("Invalid search query")
      return
    }

    if (!searchQuery || searchQuery.length < 3) {
      setErrorMessage("Search text should be at least 3 characters long")
      return
    }

    const encodedSearchQuery = encodeURI(searchQuery)
    router.push(`/search?q=${encodedSearchQuery}`)
  }

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value)
    setErrorMessage(null)
  }

  return (
    <form onSubmit={onSearch} className="flex justify-center w-1/3 ml-5 my-5">
      <input
        value={searchQuery || ""}
        onChange={handleSearchQueryChange}
        className="px-5 py-1 w-2/3 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        placeholder="Search the text here..."
      />
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </form>
  )
}

export default SearchInput