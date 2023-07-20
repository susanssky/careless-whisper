"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";





const AdvancedSearchInput = () => {
  const [showInputs, setShowInputs] = useState(false)
  const [keywords, setKeywords] = useState("")
  const [user, setUser] = useState("")
  const [leader, setLeader] = useState("")
  const [cohort, setCohort] = useState("")
  const [syllabusModule, setSyllabusModule] = useState("")
  const [duration, setDuration] = useState("")

 

  const router = useRouter()

  const [keywordsSuggestions, setKeywordsSuggestions] = useState<string[]>([])
  const [userSuggestions, setUserSuggestions] = useState<string[]>([])
  const [leaderSuggestions, setLeaderSuggestions] = useState<string[]>([])
  const [cohortSuggestions, setCohortSuggestions] = useState<string[]>([])
  const [syllabusSuggestions, setSyllabusSuggestions] = useState<string[]>([])
  const [durationSuggestions, setDurationSuggestions] = useState<string[]>([])
  

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    if (name === "cohortName" || name === "syllabusName") {
      setCohort(value)
    } else {
      switch (name) {
        case "keywords":
          setKeywords(value)
          break
        case "user":
          setUser(value)
          break
        case "leader":
          setLeader(value)
          break
        case "syllabusModule":
          setSyllabusModule(value)
          break
        case "duration":
          setDuration(value)
          break
        default:
          break
      }
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowInputs(!showInputs)}
        className="ml-5 px-6 py-3 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-red-200 hover:bg-red-600 transition-all duration-200"
      >
        Advanced Search
      </button>

      {showInputs && (
        <form
          onSubmit={onSearch}
          className="p-8 mt-4 bg-white rounded-lg shadow-lg absolute top-12 inset-x-0"
        >
          <div className="space-y-6">
         
            <input
              value={cohort}
              onClick={() => setCohortSuggestions(cohortSuggestions)}
              onChange={handleInputChange}
              name="cohortName"
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Cohort"
              list="cohortSuggestions"
            />

{/*           
            <input
              value={keywords}
              onClick={() =>
                setKeywordsSuggestions(keywordsSuggestions
                )
              }
              onChange={handleInputChange}
              name="keywords"
              className="input-field w-full px-4 py-2 rounded-md focus:outline-none focus:border-red-500 focus:ring-red-500"
              placeholder="Keywords"
              list="keywordsSuggestions"
            /> */}

            <input
              value={user}
              onClick={() =>
                setUserSuggestions(userSuggestions
                )
              }
              onChange={handleInputChange}
              name="user"
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="User"
              list="userSuggestions"
            />

            <input
              value={leader}
              onClick={() =>
                setLeaderSuggestions(leaderSuggestions
                )
              }
              onChange={handleInputChange}
              name="leader"
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Leader"
              list="leaderSuggestions"
            />

            <input
              value={syllabusModule}
              onClick={() =>
                setSyllabusSuggestions(syllabusSuggestions
                )
              }
              onChange={handleInputChange}
              name="syllabusModule"
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Syllabus"
              list="syllabusSuggestions"
            />

            {/* <input
              value={duration}
              onClick={() =>
                setDurationSuggestions(durationSuggestions
                )
              }
              onChange={handleInputChange}
              name="duration"
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Duration"
              list="durationSuggestions"
            /> */}

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="px-8 py-3 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-red-200 hover:bg-red-600 transition-all duration-200"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowInputs(false)}
                className="px-8 py-3 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-red-200 hover:bg-red-600 transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
          <datalist id="keywordsSuggestions">
            {keywordsSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <datalist id="userSuggestions">
            {userSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <datalist id="leaderSuggestions">
            {leaderSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <datalist id="cohortSuggestions">
            {cohortSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <datalist id="syllabusSuggestions">
            {syllabusSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
          <datalist id="durationSuggestions">
            {durationSuggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        </form>
      )}
    </div>
  )
}

export default AdvancedSearchInput