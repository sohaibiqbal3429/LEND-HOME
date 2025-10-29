import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(_req: NextRequest) {
    // Token checks are handled in `authorized` below. This is just a pass-through.
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;
        const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/apply") || pathname.startsWith("/admin");
        if (!isProtected) return true; // public
        if (!token) return false; // not signed in
        if (pathname.startsWith("/admin")) {
          return (token as any).role === "ADMIN"; // require admin role
        }
        return true;
      }
    },
    pages: {
      signIn: "/login"
    }
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/apply/:path*", "/admin/:path*"]
};
