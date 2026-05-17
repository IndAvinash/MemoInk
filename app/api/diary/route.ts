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


export async function PUT(req:Request){
    const token = await Token();
  if (!token) {
    return Response.json({ message: "Unauthorized" }, { status: 401 });
  }
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();
 try{
    const result = await db
      .collection("entries")
      .insertOne(body);

if (result) {
      return Response.json({ success: true, ...result }, { status: 200 });
    } else {
      return Response.json({ message: "Error adding Entry" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error Adding:", error);
    return Response.json(
      { message: "Error adding" },
      { status: 500 }
    );
  }
 
}