import React from "react"

export default function DashboardTableHeadTr() {
  return (
    <tr className="bg-[#e5e5e5] dark:bg-[#3f3f3f] border">
      <th className="py-1 w-20">Cohort</th>
      <th className="py-1 w-36">Syllabus</th>
      <th className="py-1 w-36">Session</th>
      <th className="py-1 w-36">Leader</th>
      <th className="py-1 w-12">Views</th>
      <th className="py-1 w-12">Votes</th>
      <th className="py-1 w-36">Date Time</th>
    </tr>
  )
}
