import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET!
);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
  
    return NextResponse.redirect(new URL("/?status=1", req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/?status=1", req.url));
  }
}

export const config = {
  matcher: ["/profile/:path*", "/write/:path*", "/diary/:path*", "/settings/:path*"],

};