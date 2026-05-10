// /api/auth/route.ts

import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
type LoginBody = {
  email: string;
  password: string;
};
// export async function POST(