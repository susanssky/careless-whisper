import { PrismaAdapter, } from "@next-auth/prisma-adapter";
import { AuthOptions, } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { prisma, } from "@/lib/prisma";

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
		error: "/",
		signIn: "/",
		signOut: "/",
	},
	callbacks: {
		async jwt({ token, user, }) {
			//   token.role = "member"
			//   console.log(token)
			//   console.log(user)
			return { ...token, ...user, };
		},
		async session({ session, token, user, }) {
			//   console.log(session)
			//   console.log(token)
			//   console.log(user)
			session.user = token as any;
			return session;
		},
	},
};
