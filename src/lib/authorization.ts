import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function getSession(req: NextRequest) {
  return await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
}

export function redirectToHome(req: any) {
  return NextResponse.redirect(new URL("/", req.url));
}

export function handleAuthorization(req: any, pathname: any, token: any) {
  if (!token) return redirectToHome(req);

  // Role-based access control
  const adminRoutes = ["/admin"];
  const userRoutes = ["/student"];

  if (
    adminRoutes.some((route) => pathname.startsWith(route)) &&
    token.role !== "admin"
  ) {
    return redirectToHome(req);
  }

  if (
    userRoutes.some((route) => pathname.startsWith(route)) &&
    token.role !== "user"
  ) {
    return redirectToHome(req);
  }

  return NextResponse.next();
}
