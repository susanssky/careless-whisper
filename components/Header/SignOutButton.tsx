"use client"

import { signOut } from "next-auth/react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"

export default function SignOutButton({ session }: { session: any }) {
  return (
    <Menubar className="border-none cursor-pointer bg-transparent">
      <MenubarMenu>
        <MenubarTrigger>
          <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={session.user.image} className="cursor-pointer" />
            <AvatarFallback>{session.user.name}</AvatarFallback>
          </Avatar>
        </MenubarTrigger>
        <MenubarContent className="min-w-2 shadow-none">
          <MenubarItem
            onClick={() => signOut({ callbackUrl: "/" })}
            className="cursor-pointe text-black dark:text-white"
          >
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
