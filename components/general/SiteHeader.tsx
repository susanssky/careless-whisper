import Link from "next/link"

import { siteConfig } from "@/config/site"
import { UserServerSession } from "@/lib/helpers"
import { MainNav } from "@/components/general/MainNav"
import { ThemeToggle } from "@/components/general/ThemeToggle"

import SignOutButton from "./SignOutButton"

export async function SiteHeader() {
  const session = await UserServerSession()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {session && <SignOutButton />}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
