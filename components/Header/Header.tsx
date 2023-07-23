import Link from "next/link"

import { siteConfig } from "@/config/site"
import { UserServerSession } from "@/lib/helpers"
import { ThemeToggle } from "@/components/Header/ThemeToggle"
import { MainNav } from "@/components/Nav/MainNav"

import SignInButton from "./SignInButton"
import SignOutButton from "./SignOutButton"

export default async function Header() {
  const session = await UserServerSession()

  return (
    <header
      className={`sticky top-0 z-40 w-full ${
        !session ? "p-2" : "py-2"
      } border-b bg-primary dark:bg-[#565656] text-white`}
    >
      <div className="container flex items-center px-6">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-2xl font-lora font-semibold tracking-tight border-b-2 dark:border-b-2 border-red-500">
              {/* <span className="text-red-100">C</span>areless{" "} */}
              {/* <span className="text-red-100">W</span>hisper */}
              <span className="text-transparent bg-clip-text bg-gradient-to-l to-red-500 dark:to-red-400 from-white">
                Careless Whisper
              </span>
            </h2>
          </div>
          <nav className="flex items-center">
            <ThemeToggle />
            {!session && <SignInButton />}
            {session && <SignOutButton session={session} />}
          </nav>
        </div>
      </div>
    </header>
  )
}
