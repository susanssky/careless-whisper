import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { UserServerSession } from "@/lib/helpers"
import { cn } from "@/lib/utils"

interface MainNavProps {
  items?: NavItem[]
}

export async function MainNav({ items }: MainNavProps) {
  const session = await UserServerSession()
  if (!session) {
    items = []
  }
  if (session?.user.role === "Trainee") {
    items = items?.filter((item) => !item.isMentor)
  }

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={session ? "/dashboard" : "/"}
        className="flex items-center space-x-2"
      >
        <Image src="/images/cyf-logo.png" alt="Logo" width={100} height={30} />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
