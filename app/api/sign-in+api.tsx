import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { generateJwt, hashPassword } from "@/utils/auth";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return Response.json({ error: "User does not exist" }, { status: 400 });
  }

  const hashedPassword = await hashPassword(password);

  if (user.password !== hashedPassword) {
    return Response.json({ error: "Invalid password" }, { status: 400 });
  }

  const token = await generateJwt(user.id);

  return Response.json({ token });
}
