

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
         
        >
            {sentence.content}
        </div>
      ))}
    </>
  )
}

export default Sentences
