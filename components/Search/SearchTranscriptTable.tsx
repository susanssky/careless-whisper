import Link from "next/link"
import { useRouter } from "next/navigation"

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
  const router = useRouter()
  const handleClick = async (transcriptId: string) => {
    router.push(`/dashboard/transcripts/${transcriptId}`)
  }
  return (
    <div className="mt-4">
      <table className="w-full border-collapse text-center text-xs">
        <thead>
          <tr className="bg-[#e5e5e5] dark:bg-[#3f3f3f] border">
            <th className="py-1">Syllabus</th>
            <th className="py-1">Cohort</th>
            <th className="py-1">Session</th>
            <th className="py-1">Leader</th>
          </tr>
        </thead>
        <tbody>
          {transcripts.map((transcript) => (
            <tr
              onClick={() => handleClick(transcript.id.toString())}
              key={transcript.id}
              className="cursor-pointer hover:bg-red-500 hover:text-white dark:hover:text-white"
            >
              <td className="py-1 border">{transcript.syllabus?.name}</td>
              <td className="py-1 border">{transcript.cohort?.name}</td>
              <td className="py-1 border">{transcript.sessionName}</td>
              <td className="py-1 border">{transcript.leaderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SearchTranscriptTable
