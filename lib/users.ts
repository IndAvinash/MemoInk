import jwt, { JwtPayload } from "jsonwebtoken";
import clientPromise from "@/lib/databse";
import { UserModel } from "@/types/user";
const SECRET = process.env.JWT_SECRET;
export async function getUserFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const email = decoded.email;
    console.log("Decoded token email:", email);
    const client = await clientPromise;
    const db = client.db();
    const existingUser = await db
        .collection<UserModel>("users")
        .findOne({
          $or: [
            { email }
          ],
        });
    return existingUser;
  } catch {
    return null;
  }
}

