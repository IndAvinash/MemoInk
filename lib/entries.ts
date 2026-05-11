import clientPromise from "./databse";


export async function entriesOfUser(username: string) {
  const client = await clientPromise;
  const db = client.db();
    console.log("Fetching entries for user:", username);
    const entries = await db.collection<DiaryEntry>("entries").find({ username });
  console.log("Entries found:", await entries.count());
    return await entries.toArray();
}