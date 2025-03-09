import jwt from "jsonwebtoken";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { User, users } from "@/db/schema";

async function getUser(request: Request) {
  const token = request.headers.get("authorization")?.split(" ")[1];

  if (!token) {
    return undefined;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });

    return user;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}

export function withAuth(
  handler: (request: Request, user: User) => Promise<Response>
) {
  return async (request: Request) => {
    const user = await getUser(request);

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    return handler(request, user);
  };
}
