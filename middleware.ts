// import { NextResponse } from "next/server"
// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   // `withAuth` augments your `Request` with the user's token.
//   function middleware(req) {
//     console.log(req.nextauth)
//     if (
//       req.nextUrl.pathname === "/dashboard" &&
//       req.nextauth.token?.role !== "Mentor"
//     ) {
//       return new NextResponse("You are not authorized!")
//     }
//   },
//   {
//     callbacks: {
//       authorized: (params) => {
//         let { token } = params
//         return !!token
//       },
//     },
//   }
// )
export { default } from "next-auth/middleware"
export const config = {
  matcher: ["/dashboard/:path*"],
}
