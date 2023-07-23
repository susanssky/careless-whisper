"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

import { Input } from "@/components/ui/input"

const SearchInput = () => {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([])
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  useEffect(() => {
    const previousSearches = JSON.parse(
      localStorage.getItem("searchHistory") || "[]"
    )
    setSearchHistory(previousSearches)
    setSearchSuggestions(getUniqueSuggestions(previousSearches))
  }, [])

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()
    if (searchQuery && searchQuery.length >= 3) {
      const encodedSearchQuery = encodeURI(searchQuery)
      router.push(`/dashboard/search?q=${encodedSearchQuery}`)

      const updatedSearchHistory = [searchQuery, ...searchHistory].slice(0, 5)
      localStorage.setItem(
        "searchHistory",
        JSON.stringify(updatedSearchHistory)
      )
      setShowErrorMessage(false)
    } else {
      setShowErrorMessage(true)
    }
  }

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const query = event.target.value
    setSearchQuery(query)
    setSearchSuggestions(getMatchingSuggestions(query))
  }

  const getUniqueSuggestions = (searchHistory: string[]): string[] => {
    const suggestionCount: { [key: string]: number } = {}
    const uniqueSuggestions: string[] = []

    searchHistory.forEach((search) => {
      suggestionCount[search] = (suggestionCount[search] || 0) + 1
    })

    const sortedSuggestions = Object.keys(suggestionCount).sort(
      (a, b) => suggestionCount[b] - suggestionCount[a]
    )
    sortedSuggestions.forEach((query) => {
      if (!uniqueSuggestions.includes(query)) {
        uniqueSuggestions.push(query)
      }
    })

    return uniqueSuggestions.slice(0, 5)
  }

  const getMatchingSuggestions = (query: string): string[] => {
    const matchingSuggestions = searchHistory.filter(
      (search) => search.includes(query) && search !== query
    )
    return matchingSuggestions.slice(0, 5)
  }

  return (
    <form onSubmit={onSearch} className="flex flex-col">
      <div className="flex items-center gap-1 rounded-md dark:bg-[#1f1f1f]  bg-white pl-2 border-none">
        <MagnifyingGlassIcon className="dark:text-red-500" />
        <Input
          value={searchQuery || ""}
          onChange={handleSearchQueryChange}
          placeholder={"Search the transcripts..."}
          className="w-max p-0 border-none focus-visible:none focus:border-teal focus:outline-none focus:ring-0 focus:border-white"
        />
      </div>
      {showErrorMessage && (
        <p className="max-w-[200px] pl-2 text-sm text-red-700 dark:text-white">
          Search text should be at least 3 characters long
        </p>
      )}
      {/* <datalist id="searchSuggestions">
        {searchSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist> */}
    </form>
  )
}

export default SearchInput
