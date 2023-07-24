"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ZoomInIcon } from "@radix-ui/react-icons"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
    router.push(`/dashboard/advanced-search?${encodedSearchParams}`)
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
  const buttonStyle: string =
    "flex gap-2 h-7 rounded dark:text-white dark:bg-[#8c8c8c] hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"

  return (
    <div>
      <Button
        className={`w-full flex gap-1 justify-start px-2 py-0 ${
          showInputs
            ? "text-black hover:text-white bg-red-500 hover:bg-red-500 dark:bg-red-500"
            : "dark:bg-[#1f1f1f]"
        }`}
        onClick={() => setShowInputs(!showInputs)}
      >
        <ZoomInIcon className={`${showInputs ? "" : "dark:text-red-500"}`} />
        <span className={`${showInputs ? "" : "dark:text-[#7f8ea3]"}`}>
          Advanced Search
        </span>
      </Button>

      {showInputs && (
        <form onSubmit={onSearch} className="flex flex-col gap-2 mt-2">
          <>
            <Input
              value={cohort}
              onClick={() => setCohortSuggestions(cohortSuggestions)}
              onChange={handleInputChange}
              name="cohortName"
              className="input-field py-2 focus:border-red-500 focus:ring-red-500"
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

            <Input
              value={user}
              onClick={() => setUserSuggestions(userSuggestions)}
              onChange={handleInputChange}
              name="user"
              className=""
              placeholder="User"
              list="userSuggestions"
            />

            <Input
              value={leader}
              onClick={() => setLeaderSuggestions(leaderSuggestions)}
              onChange={handleInputChange}
              name="leader"
              className="input-field py-2 focus:border-red-500 focus:ring-red-500"
              placeholder="Leader"
              list="leaderSuggestions"
            />

            <Input
              value={syllabusModule}
              onClick={() => setSyllabusSuggestions(syllabusSuggestions)}
              onChange={handleInputChange}
              name="syllabusModule"
              className="input-field py-2 focus:border-red-500 focus:ring-red-500"
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

            <div className="flex justify-between">
              <Button type="submit" className={buttonStyle}>
                Search
              </Button>
              <Button
                type="button"
                onClick={() => setShowInputs(false)}
                className={buttonStyle}
              >
                Cancel
              </Button>
            </div>
          </>
          {/* <datalist id="keywordsSuggestions">
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
          </datalist> */}
        </form>
      )}
    </div>
  )
}

export default AdvancedSearchInput
