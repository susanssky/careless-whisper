import Image from "next/image"

import { getMostRecentTranscripts } from "@/lib/dateTranscripts"
import {
  getAllTranscripts,
  getAllTranscriptsByCreatedAt,
  getAllTranscriptsByMostViews,
  getAllTranscriptsByMostVotes,
  UserServerSession,
} from "@/lib/helpers"
import ThreeRowsTable from "@/components/Dashboard/ThreeRowsTable"

export const revalidate = 1

export default async function DashboardPage() {
  // const transcripts = await getAllTranscripts()
  const transcriptsByCreatedAt = await getAllTranscriptsByCreatedAt()
  const session = await UserServerSession()
  // console.log(transcripts)
  // console.log(session?.user)

  const getTranscriptsByViewed = await getAllTranscriptsByMostViews()
  const getTranscriptsByVoted = await getAllTranscriptsByMostVotes()
  // console.log(getTranscriptsByRecent)

  return (
    <section className="grow flex flex-col gap-8 p-4">
      <section className="flex justify-center gap-10 items-center">
        <h2 className="border-b pb-2 text-3xl text-center font-lora font-semibold tracking-tight">
          Welcome back,
          <br />
          {session?.user?.role}{" "}
          <span className="text-red-500">{session?.user?.name}</span> !
        </h2>
        <Image
          src={`/images/dashboard/welcome.svg`}
          alt={"welcome"}
          width={240}
          height={203}
        />
      </section>
      <section className="bg-red-500 text-white p-2 text-center font-lora rounded-md mb-4">
        {/* <h1 className="text-4xl font-bold">Welcome to Our Home Page</h1> */}
        <p className="text-xl">
          Explore the most viewed, voted, and recently added transcriptions
          below.
        </p>
      </section>
      {/* <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          Your <span className="text-red-500">Saved</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <table className="w-full border-collapse text-center text-xs">
            <thead>
              <DashboardTableHeadTr />
            </thead>
            <tbody>
              {transcripts.slice(0, 3).map((transcript) => (
                <DashboardTableBodyTr transcript={transcript} />
              ))}
            </tbody>
          </table>
        </div>
      </section> */}
      {/* <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          <span className="text-red-500">Recently Added</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <table className="w-full border-collapse text-center text-xs">
            <thead className="rounded-md border-[#807f7f] border">
              <DashboardTableHeadTr />
            </thead>
            <tbody>
              {transcriptsByCreatedAt.slice(0, 3).map((transcript) => {
                console.log(transcript)
                return <DashboardTableBodyTr transcript={transcript} />
              })}
            </tbody>
          </table>
        </div>
      </section> */}
      <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          <span className="text-red-500">Recently Added</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <ThreeRowsTable transcriptData={transcriptsByCreatedAt} />
        </div>
      </section>
      <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          <span className="text-red-500">Most Viewed</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <ThreeRowsTable transcriptData={getTranscriptsByViewed} />
        </div>
      </section>
      <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          <span className="text-red-500">Most Voted</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <ThreeRowsTable transcriptData={getTranscriptsByVoted} />
        </div>
      </section>
    </section>
  )
}
