// /api/auth/route.ts

import { signToken } from "@/lib/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { Token } from "@/lib/utils";
import jwt,{JwtPayload} from "jsonwebtoken";
type LoginBody = {
  email: string;
  password: string;
};

const SECRET = process.env.JWT_SECRET!;
export async function POST(){
    const token = await Token();
    if(token!=undefined){
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const username = decoded.userId;
    return Response.json({success:'ok',username},{status:200})

    }
    return Response.json({token},{status:200})
    
}
