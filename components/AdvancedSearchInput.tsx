"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"


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
    event.preventDefault();

    const searchParams = {
      keywords,
      user,
      leader,
      cohort,
      syllabusModule,
      duration,
    };

    const encodedSearchParams = new URLSearchParams(searchParams).toString();
    router.push(`/advancedsearch?${encodedSearchParams}`);
  };

  const toggleInputs = () => {
    setShowInputs(!showInputs);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onSearch(event as React.FormEvent);
    }
  };

  return (
    <>  {!showInputs && (
        <button
          onClick={toggleInputs}
          className="px-5 py-1 w-1/7 sm:px-5 sm:py-3 flex-1 text-zinc-200 bg-zinc-800 focus:bg-black rounded-full focus:outline-none focus:ring-[1px] focus:ring-green-700 placeholder:text-zinc-400"
        >
          Advanced Search
        </button>
      )}
    <form onSubmit={onSearch} className="flex justify-center w-1/3 ml-5 my-5">
    

      {showInputs && (
        <>
          <input
            value={keywords}
            onChange={(event) => setKeywords(event.target.value)}
            className="input-field"
            placeholder="Keywords"
            onKeyPress={handleKeyPress}
          />

          <input
            value={user}
            onChange={(event) => setUser(event.target.value)}
            className="input-field"
            placeholder="User"
            onKeyPress={handleKeyPress}
          />

          <input
            value={leader}
            onChange={(event) => setLeader(event.target.value)}
            className="input-field"
            placeholder="Leader"
            onKeyPress={handleKeyPress}
          />

          <input
            value={cohort}
            onChange={(event) => setCohort(event.target.value)}
            className="input-field"
            placeholder="Cohort"
            onKeyPress={handleKeyPress}
          />

          <input
            value={syllabusModule}
            onChange={(event) => setSyllabusModule(event.target.value)}
            className="input-field"
            placeholder="Syllabus"
            onKeyPress={handleKeyPress}
          />

          <input
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            className="input-field"
            placeholder="Duration"
            onKeyPress={handleKeyPress}
          />
        </>
      )}

      <style jsx>{`
        .input-field {
          width: 100%;
          padding: 8px;
          margin-top: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </form>
    </>
  );
};

export default AdvancedSearchInput;

