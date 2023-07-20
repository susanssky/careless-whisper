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
      <form onSubmit={onSearch} className="w-full max-w-md mx-auto">
      <div className="flex items-center border border-red-600 rounded-full shadow-md">
        <input
          value={searchQuery || ""}
          onChange={handleSearchQueryChange}
          className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-red-400 text-zinc-700 placeholder:text-z"
          placeholder="Search the text here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Search
        </button>
      </div>
      {errorMessage && <div className="text-red-500 mt-2">{errorMessage}</div>}
    </form>
  )
}

export default SearchInput