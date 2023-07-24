"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"



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
      router.push(`/search?q=${encodedSearchQuery}`)

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
    <form onSubmit={onSearch} className="w-full max-w-md mx-auto">
      <div className="flex items-center border border-red-600 rounded-full shadow-md">
        <input
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring focus:ring-red-400 text-zinc-700 placeholder:text-z"
          placeholder="Search the text here..."
          list="searchSuggestions"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Search
        </button>
      </div>
      {showErrorMessage && (
        <p className="text-red-500 mt-2 text-sm">
          Search text should be at least 3 characters long
        </p>
      )}
      <datalist id="searchSuggestions">
        {searchSuggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </form>
  )
}

export default SearchInput