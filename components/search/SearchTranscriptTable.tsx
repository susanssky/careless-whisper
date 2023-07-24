import Link from "next/link"

interface TranscriptTableProps {
  transcripts: {
    id: number
    cohort: {
      name: string
    }
    syllabus: {
      name: string
    }
    sessionName: string
    leaderName: string
  }[]
}

const SearchTranscriptTable = ({ transcripts }: TranscriptTableProps) => {
  return (
    <div className="mt-4">
      <table className="w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 py-2 px-4">Syllabus</th>
            <th className="border border-red-500 py-2 px-4">Cohort</th>
            <th className="border border-red-500 py-2 px-4">Session</th>
            <th className="border border-red-500 py-2 px-4">Leader</th>
          </tr>
        </thead>
        <tbody>
          {transcripts.map((transcript) => (
            <tr key={transcript.id} className="hover:bg-gray-100">
              <td className="border border-red-500 py-2 px-4">
                <Link
                  href={`/dashboard/transcripts/${transcript.id}`}
                  className="text-red-500 hover:underline"
                >
                  {transcript.syllabus?.name}
                </Link>
              </td>
              <td className="border border-red-500 py-2 px-4">
                {transcript.cohort?.name}
              </td>
              <td className="border border-red-500 py-2 px-4">
                {transcript.sessionName}
              </td>
              <td className="border border-red-500 py-2 px-4">
                {transcript.leaderName}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearchTranscriptTable
