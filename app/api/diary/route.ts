import clientPromise from "@/lib/databse";
import { entriesOfUser } from "@/lib/entries";
import { getUserFromToken } from "@/lib/users";
import { Token } from "@/lib/utils";
import { get } from "http";


export async function GET() {
    const token = await Token();
    if(token == null){
        return Response.json({message:"Unauthorized"},{status:401});
    }
    const user = await getUserFromToken(token);
    if(user == null){
        return Response.json({message:"Unauthorized"},{status:401});
    }
    const entries = await entriesOfUser(user.username);
    if(entries == null){
        console.log("No entries found for user:", user.username);
        return Response.json({message:"No entries found"},{status:404});
    }
    console.log("hi",entries);
    // console.log(user.username);
    return Response.json({
        success:"ok",
        entries: entries,
    },{status:200});
}