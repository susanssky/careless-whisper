import React from "react"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="grow container flex flex-col gap-8 md:gap-6 p-6 md:p-10">
      <section className="grid grid-cols-1 md:grid-cols-2 md:place-items-center gap-y-10 md:gap-x-20">
        <div className="flex flex-col gap-2">
          <h2
            className={
              "border-b pb-2 text-2xl md:text-3xl font-lora font-semibold tracking-tight transition-colors"
            }
          >
            <span className="text-red-500">Introducing</span> Careless Whisper
          </h2>
          <p>
            Welcome to Careless Whisper, the ultimate app that revolutionises
            the way you learn.
          </p>
          <p>
            Say goodbye to the days of scribbling down notes and struggling to
            catch up with your lessons.
          </p>
          <p>
            Careless Whisper brings you the future of learning with accurate and
            comprehensive Careless Whisper, empowering you to excel in your
            studies and beyond.
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={`/images/homepage/collaborators.svg`}
            alt={"Collaborators"}
            width={330}
            height={208}
            className="w-full max-h-80"
          />
        </div>
      </section>
      <hr className="dark:border dark:border-solid dark:border-zinc-800" />
      <section className="grid grid-cols-1 md:grid-cols-2 md:place-items-center gap-y-10 md:gap-x-20">
        <div className="row-start-1 row-end-2 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-1 gap-3">
          <div className="flex flex-col gap-2">
            <p>
              Careless Whisper combines the power of advanced transcription
              technology and user-friendly features to create a dynamic and
              personalised study experience.
            </p>
            <p>
              Once the lesson materials are uploaded, our app automatically
              generates detailed transcripts, making every word searchable.
            </p>
            <p>
              This breakthrough feature enables students to quickly find
              specific topics, keywords, or key concepts within the lesson
              materials, enhancing their ability to review and study
              efficiently.
            </p>
          </div>
        </div>
        <div className="row-start-2 row-end-3 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-1 flex justify-center items-center">
          <Image
            src={`/images/homepage/export.svg`}
            alt={"Export"}
            width={279}
            height={327}
            className="w-full max-h-80"
          />
        </div>
      </section>
      <hr className="dark:border dark:border-solid dark:border-zinc-800" />
      <section className="grid grid-cols-1 md:grid-cols-2 md:place-items-center gap-y-10 md:gap-x-20">
        <div className="flex flex-col gap-2">
          <h2 className="border-b pb-2 text-2xl md:text-3xl font-lora font-semibold tracking-tight transition-colors">
            <span className="text-red-500">Join</span> the TranscriptHero
            Community Today!
          </h2>
          <ol className="flex flex-col gap-2 list-decimal list-inside m-0 p-0 w-auto my-auto">
            <li>
              Instant Transcriptions: Experience the magic of our cutting-edge
              technology as TranscriptHero instantly converts your lessons into
              accurate written transcripts. No more time wasted on note-taking;
              focus on understanding and absorbing the content instead.
            </li>
            <li>
              Searchable Content: Never lose track of important information
              again. With TranscriptHero, every word is at your fingertips.
              Effortlessly search through your transcriptions to find specific
              concepts, keywords, or references, saving you hours of scrolling
              and flipping through pages.
            </li>
          </ol>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src={`/images/homepage/adventure.svg`}
            alt={"Adventure"}
            width={539}
            height={418}
            className="w-full max-h-80"
          />
        </div>
      </section>
    </main>
  )
}
