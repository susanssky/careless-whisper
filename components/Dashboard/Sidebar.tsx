import Image from "next/image"
import Link from "next/link"
import {
  BookmarkFilledIcon,
  FileTextIcon,
  HomeIcon,
  QuestionMarkCircledIcon,
  ReaderIcon,
  UploadIcon,
} from "@radix-ui/react-icons"

import { UserServerSession } from "@/lib/helpers"
import { Button } from "@/components/ui/button"

import AdvancedSearchInput from "../AdvancedSearchInput"
import SearchInput from "../Search/SearchInput"

export default async function Sidebar() {
  const session = await UserServerSession()
  const linkStyle: string = "flex flex-wrap items-center"
  const buttonStyle: string =
    "flex gap-2 flex-1 h-7 rounded justify-start dark:bg-[#8c8c8c] dark:text-white hover:bg-red-500 hover:text-black dark:hover:bg-red-500 dark:hover:text-black"
  const iconStyle: string = "mr-2 h-4 w-4"
  return (
    <section className="hidden md:flex flex-col gap-3 p-3 bg-gradient-to-b from-[#959595] to-background dark:bg-gradient-to-b dark:from-[#3f3f3f] dark:to-[#1f1f1f]">
      <SearchInput />
      <AdvancedSearchInput />
      <div></div>

      <div className="flex flex-col gap-2">
        <Link href="/dashboard" className={linkStyle}>
          <Button className={buttonStyle}>
            <HomeIcon className={iconStyle} />
            <span>Home</span>
          </Button>
        </Link>
        {/* <Link href="#" className={linkStyle}>
          <Button className={buttonStyle}>
            <BookmarkFilledIcon className={iconStyle} />
            <span>Saved</span>
          </Button>
        </Link> */}
        <Link href="/dashboard/transcripts" className={linkStyle}>
          <Button className={buttonStyle}>
            <FileTextIcon className={iconStyle} />
            <span>Transcripts</span>
          </Button>
        </Link>

        {session?.user.role === "Mentor" && (
          <>
            <Link href="/dashboard/create-transcript" className={linkStyle}>
              <Button className={buttonStyle}>
                <UploadIcon className={iconStyle} />
                <span>Upload</span>
              </Button>
            </Link>
            <Link href="/dashboard/tutorial" className={linkStyle}>
              <Button className={buttonStyle}>
                <ReaderIcon className={iconStyle} />
                <span>Tutorial</span>
              </Button>
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
