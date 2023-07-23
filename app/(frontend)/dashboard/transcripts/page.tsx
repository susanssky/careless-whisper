import React from "react"

import { getAllTranscripts } from "@/lib/helpers"
import DashboardTableBodyTr from "@/components/Dashboard/TableBodyTr"
import DashboardTableHeadTr from "@/components/Dashboard/TableHeadTr"

export default async function TragetAllTranscriptsPage() {
  const tragetAllTranscripts = await getAllTranscripts()
  return (
    <section className="grow p-4">
      <section className="rounded-lg dark:bg-zinc-800">
        <h2 className="border-b py-2 text-3xl font-lora font-semibold tracking-tight text-center">
          List of <span className="text-red-500">All</span> Transcripts
        </h2>
        <div className="px-4 py-6">
          <table className="w-full border-collapse text-center text-xs">
            <thead>
              <DashboardTableHeadTr />
            </thead>
            <tbody>
              {tragetAllTranscripts.map((transcript) => (
                <DashboardTableBodyTr transcript={transcript} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  )
}
