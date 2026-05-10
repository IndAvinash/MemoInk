import clientPromise from "./databse";


export async function entriesOfUser(username: string) {
  const client = await clientPromise;
  const db = client.db();

    const entries = await db.collection<DiaryEntry>("entries").find({ username });
    return entries;
}