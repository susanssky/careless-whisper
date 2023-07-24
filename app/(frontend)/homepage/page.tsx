import React from "react"

import MostRecentTranscripts from "@/components/Homepage/MostRecentTranscripts"
import MostViewedTranscripts from "@/components/Homepage/MostViewedTranscripts"
import MostVotedTranscripts from "@/components/Homepage/MostVotedTranscripts"

const HomePage = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-red-500 text-white p-8 rounded-md mb-4">
        <h1 className="text-4xl font-bold">Welcome to Our Home Page</h1>
        <p className="text-xl mt-4">
          Explore the most viewed, voted, and recently added transcripts below.
        </p>
      </div>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
        <MostViewedTranscripts />
        <MostVotedTranscripts />
        <MostRecentTranscripts />
      </div>
    </div>
  )
}

export default HomePage
