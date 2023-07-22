import React from "react";

import MostViewedTranscripts from "@/components/homepage/MostViewedTranscripts";
import MostVotedTranscripts from "@/components/homepage/MostVotedTranscriptions";
import MostRecentTranscripts from "@/components/homepage/MostRecentTranscripts";


const HomePage = () => {
 
  return (
    <div className="container mx-auto p-4">

      <div className="bg-red-500 text-white p-8 rounded-md mb-4">
        <h1 className="text-4xl font-bold">Welcome to Our Home Page</h1>
        <p className="text-xl mt-4">
          Explore the most viewed, voted, and recently added transcriptions
          below.
        </p>
      </div>

    <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
    <MostViewedTranscripts/>
   <MostVotedTranscripts/>
   <MostRecentTranscripts/>
   </div>

    </div>
  )
}

export default HomePage