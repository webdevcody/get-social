import { profiles } from "@/db/schema";
import { db } from "@/db";
import { User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const GET = withAuth(async (request: Request, user: User) => {
  const userId = request.url.split("/").pop();

  if (!userId) {
    return Response.json({ error: "User ID is required" }, { status: 400 });
  }

  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
  });

  return Response.json(profile);
});
