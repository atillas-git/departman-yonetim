import { withAuth } from "next-auth/middleware"

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
  },
  {
    secret:process.env.NEXT_SECRET,
    pages:{
        signIn:"/girisyap"
    }
  }
)

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/app/:path*',
}