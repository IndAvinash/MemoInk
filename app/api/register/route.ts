import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import clientPromise from "@/lib/databse";
import { UserModel } from "@/types/user";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      username,
      email,
      password_hash,
      diary_name,
      display_name,
      avatar_url,
    } = body;

    // basic validation
    if (
      !username ||
      !email ||
      !password_hash ||
      !diary_name
    ) {
      return NextResponse.json(
        {
          error: `Missing required fields,${!username ? " username" : ""}${!email ? " email" : ""}${!password_hash ? " password_hash" : ""}${!diary_name ? " diary_name" : ""}`,
        },
        {
          status: 400,
        }
      );
    }

    const client = await clientPromise;

    const db = client.db();

    // check existing user
    const real_password_hash = await bcrypt.hash(password_hash, 12);
    const existingUser = await db
      .collection<UserModel>("users")
      .findOne({
        $or: [
          { email },
          { username },
        ],
      });

    if (existingUser) {
      return NextResponse.json(
        {
          error:
            "Email or username already exists",
        },
        {
          status: 409,
        }
      );
    }

    // hash password
   

    // create user object
    const newUser: UserModel = {
      username,
      email,
      password_hash: real_password_hash,

      diary_name,
        
      profile: {
        display_name:
          display_name || username,

        avatar_url:
          avatar_url ||
          "https://default-avatar.com/avatar.png",
      },

      settings: {
        theme: "dark",
        daily_reminder_time: "08:30",
        is_private: true,
      },

      created_at: new Date(),
    };

    // insert into mongodb
    const result = await db
      .collection<UserModel>("users")
      .insertOne(newUser);

    return NextResponse.json(
      {
        success: true,
        user_id: result.insertedId,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}