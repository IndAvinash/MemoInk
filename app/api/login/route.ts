// app/api/login/route.ts

import { UserModel } from "@/types/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import clientPromise from "@/lib/databse";
import { cookies } from "next/headers";
import { NextRequest ,NextResponse} from "next/server";

const SECRET = process.env.JWT_SECRET!;

type LoginBody = {
  email: string;
  password: string;
};

export async function POST(
  req: NextRequest
) {
  const body: LoginBody = await req.json();

  const { email, password } = body;

  // Example user
    const client = await clientPromise;

    const db = client.db();
  const existingUser = await db
        .collection<UserModel>("users")
        .findOne({
          $or: [
            { email }
          ],
        });
  
      if (existingUser) {
        if(email !== existingUser.email || !await bcrypt.compare(password, existingUser.password_hash)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid email or password",
          },
          {
            status: 401,
          }
        );
      }else{
        // Generate token
        const token = jwt.sign(
          {
            userId: existingUser.username,
            email: existingUser.email,
          },
          SECRET,
          {
            expiresIn: "7d",
          }
        );
        (await cookies()).set("token", token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV ===
      "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  const tok = (await cookies())
    .get("token")
    ?.value;
console.log("Token set in cookies:", tok);
 // Debug log

  return NextResponse.json({
    success: true,
  },{
    status: 200,
  });
      }

  
  }else{
    return NextResponse.json(
      {
        success: false,
        message: "User not found",
      },
      {
        status: 401,
      }
    );
  }


 
  // Save cookie
  
}