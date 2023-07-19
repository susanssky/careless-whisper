"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"




const AdvancedSearchInput = () => {
  const [showInputs, setShowInputs] = useState(false);
  const [keywords, setKeywords] = useState("");
  const [user, setUser] = useState("");
  const [leader, setLeader] = useState("");
  const [cohort, setCohort] = useState("");
  const [syllabusModule, setSyllabusModule] = useState("");
  const [duration, setDuration] = useState("");

  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault()

    const searchParams = {
      keywords,
      user,
      leader,
      cohort,
      syllabusModule,
      duration,
    };

    const encodedSearchParams = new URLSearchParams(searchParams).toString();
    router.push(`/advancedSearch?${encodedSearchParams}`);
  };

  const onCancel = () => {
    setKeywords("");
    setUser("");
    setLeader("");
    setCohort("");
    setSyllabusModule("");
    setDuration("");
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(event);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowInputs(!showInputs)}
        className="ml-5 px-6 py-3 text-white bg-red-500 rounded-full focus:outline-none focus:ring focus:ring-red-200 hover:bg-red-600 transition-all duration-200"
      >
        Advanced Search
      </button>

      {showInputs && (
        <form onSubmit={onSearch} className="p-8 mt-4 bg-white rounded-lg shadow-lg absolute top-12 inset-x-0">
          <div className="space-y-6">
         <input
              value={keywords}
              onChange={(event) => setKeywords(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:outline-none focus:border-red-500 focus:ring focus:ring-opacity suffix"
              placeholder="Keywords"
              onKeyPress={handleKeyPress}
            />


            <input
              value={user}
              onChange={(event) => setUser(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="User"
              onKeyPress={handleKeyPress}
            />

            <input
              value={leader}
              onChange={(event) => setLeader(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Leader"
              onKeyPress={handleKeyPress}
            />

            <input
              value={cohort}
              onChange={(event) => setCohort(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Cohort"
              onKeyPress={handleKeyPress}
            />

            <input
              value={syllabusModule}
              onChange={(event) => setSyllabusModule(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Syllabus"
              onKeyPress={handleKeyPress}
            />

            {/* <input
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              className="input-field w-full px-4 py-2 rounded-md focus:border-red-500 focus:ring-red-500"
              placeholder="Duration"
              onKeyPress={handleKeyPress}
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
        </form>
      )}
    </div>
  );
};

export default AdvancedSearchInput;
