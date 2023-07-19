"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"

const AdvancedSearchInput = () => {
  const [showInputs, setShowInputs] = useState(false)
  const [keywords, setKeywords] = useState("")
  const [user, setUser] = useState("")
  const [leader, setLeader] = useState("")
  const [cohort, setCohort] = useState("")
  const [syllabusModule, setSyllabusModule] = useState("")
  const [duration, setDuration] = useState("")

  const router = useRouter()

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()

    const searchParams = {
      keywords,
      user,
      leader,
      cohort,
      syllabusModule,
      duration,
    }

    const encodedSearchParams = new URLSearchParams(searchParams).toString()
    router.push(`/advancedSearch?${encodedSearchParams}`)
  }

  const toggleInputs = () => {
    setShowInputs(!showInputs)
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      onSearch(event)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      {!showInputs && (
        <button
          onClick={toggleInputs}
          className="ml-5 px-6 py-3 w-44 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-green-200 hover:bg-red-600 transition-all duration-200"
        >
          Advanced Search
        </button>
      )}

      {showInputs && (
        <form onSubmit={onSearch} className="flex flex-col space-y-4">
          <input
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="Keywords"
            onKeyPress={handleKeyPress}
          />

          <input
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="User"
            onKeyPress={handleKeyPress}
          />

          <input
            value={leader}
            onChange={(event) => setLeader(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="Leader"
            onKeyPress={handleKeyPress}
          />

          <input
            value={cohort}
            onChange={(event) => setCohort(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="Cohort"
            onKeyPress={handleKeyPress}
          />

          <input
            value={syllabusModule}
            onChange={(event) => setSyllabusModule(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="Syllabus"
            onKeyPress={handleKeyPress}
          />

          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="input-field w-60 focus:border-red-500"
            placeholder="Duration"
            onKeyPress={handleKeyPress}
          />

          <button
            type="submit"
            className="px-6 py-3 w-44 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-blue-200 hover:bg-red-600 transition-all duration-200"
          >
            Search
          </button>
        </form>
      )}
    </div>
  )
}

export default AdvancedSearchInput