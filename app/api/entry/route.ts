import clientPromise from "@/lib/databse";
import { entriesOfUser } from "@/lib/entries";
import { getUserFromToken } from "@/lib/users";
import { Token } from "@/lib/utils";
import { get } from "http";
import { NextRequest } from "next/server";


export async function GET(req: NextRequest){
 const id = req.nextUrl.searchParams.get("id");
 //TODO
}