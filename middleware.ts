import { NextResponse } from "next/server"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // console.log(`request.nextUrl.pathname`)
    // console.log(request.nextUrl.pathname)
    // console.log(`request.nextauth.token`);
    // console.log(request.nextauth.token);
    if (
      request.nextUrl.pathname.startsWith("/dashboard/create-transcript") &&
      request.nextauth.token?.role !== "Mentor"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    if (
      request.nextUrl.pathname.startsWith("/dashboard/turorial") &&
      request.nextauth.token?.role !== "Mentor"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)
export const config = {
  matcher: ["/dashboard/:path*"],
}
