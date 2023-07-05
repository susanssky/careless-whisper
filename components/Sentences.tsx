

import { Sentence } from "@prisma/client"

interface SentencesProps {
  sentences: Array<Sentence>
}

const Sentences = ({ sentences }: SentencesProps) => {
  return (
    <>
      {sentences.map((sentence) => (
        <div
          key={sentence.id}
          className="flex p-3 gap-4 my-3 rounded-xl border-[1px] border-zinc-600 w-3/4"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xl font-semibold">{sentence.content}</span>
            <span className="text-lg font-light">{sentence.id}</span>
          </div>
        </div>
      ))}
    </>
  )
}

export default Sentences
