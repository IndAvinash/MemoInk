// app/api/profile/route.ts

import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { userAgent } from "next/server";
import clientPromise from "@/lib/databse";
import {UserModel} from "@/types/user";
import { User } from "lucide-react";
import { getUserFromToken } from "@/lib/users";
import { Token } from "@/lib/utils";
const SECRET = process.env.JWT_SECRET!;

type JwtPayload = {
  userId: number;
  email: string;
};

export async function GET() {
  const token = await Token();
  if (!token) {
    return Response.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const existingUser = await getUserFromToken(token);
  if(existingUser!=null){
    return Response.json(existingUser
    ,{status:200,})
  }else{
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
  } catch {
    return Response.json(
      {
        message: "Invalid token",
      },
      {
        status: 401,
      }
    );
  }
}

export async function PUT(req: Request) {
  const token = await Token();
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const email = decoded.email;

    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const updateData: any = {};
    if (body.diary_name !== undefined) {
      updateData.diary_name = body.diary_name;
    }
    if (body.settings !== undefined) {
      updateData.settings = body.settings;
    }

    const result = await db.collection<UserModel>("users").findOneAndUpdate(
      { email },
      { $set: updateData },
      { returnDocument: "after" }
    );

    if (result) {
      return Response.json({ success: true, ...result }, { status: 200 });
    } else {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return Response.json(
      { message: "Error updating profile" },
      { status: 500 }
    );
  }
}