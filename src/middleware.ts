// middleware.js
import { NextRequest, NextResponse } from "next/server";
import { getSession, handleAuthorization } from "@/lib/authorization";

export async function middleware(req: NextRequest) {
  const token = await getSession(req);
  return handleAuthorization(req, req.nextUrl.pathname, token);
}

export const config = {
  matcher: ["/admin/:path*", "/student/:path*"],
};
