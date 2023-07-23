import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { AuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

import { prisma } from "@/lib/prisma"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  //   debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login-failed",
  },
  callbacks: {
    // async signIn({ user, account, profile }) {
    // console.log(user)
    // console.log(account)
    // console.log(profile)

    // return true
    // },
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   console.log(url, baseUrl)
    //   if (url.startsWith("/")) return `${baseUrl}/dashboard`
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url
    //   return baseUrl
    // },
    async jwt({ token, user }) {
      //   token.role = "member"
      //   console.log(token)
      //   console.log(user)
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // console.log(session)
      //   console.log(token)
      // console.log(user)

      session.user = token as any
      return session
    },
  },
}
