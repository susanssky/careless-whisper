import DashboardTableBodyTr from "@/components/Dashboard/TableBodyTr"
import DashboardTableHeadTr from "@/components/Dashboard/TableHeadTr"

type PropsType = {
  transcriptData: TranscriptType[]
}

export default function ThreeRowsTable({ transcriptData }: PropsType) {
  return (
    <table className="w-full border-collapse text-center text-xs">
      <thead className="rounded-md border-[#807f7f] border">
        <DashboardTableHeadTr />
      </thead>
      <tbody>
        {transcriptData.slice(0, 3).map((transcript) => {
          // console.log(transcript)
          return <DashboardTableBodyTr transcript={transcript} />
        })}
      </tbody>
    </table>
  )
}
