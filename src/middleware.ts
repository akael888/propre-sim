import { NextResponse } from "next/server";
import { auth } from "../auth";

export default auth((req) => {
  console.log("middleware running:", req.nextUrl.pathname); // ← add this
  console.log("isLoggedIn:", !!req.auth); // ← add this

  const isLoggedIn = !!req.auth;
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/slide");

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
});

export const config = {
  matcher: ["/slide", "/slide/:path*"],
};
