import { profiles } from "@/db/schema";
import { db } from "@/db";
import { User } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";
import { eq } from "drizzle-orm";

export const GET = withAuth(async (request: Request, user: User) => {
  const profile = await db.query.profiles.findFirst({
    where: eq(profiles.userId, user.id),
  });

  return Response.json(profile);
});

export const PUT = withAuth(async (request: Request, user: User) => {
  const { displayName } = await request.json();

  if (!displayName) {
    return Response.json(
      { error: "Display name is required" },
      { status: 400 }
    );
  }

  const profile = await db
    .update(profiles)
    .set({ displayName })
    .where(eq(profiles.userId, user.id));

  return Response.json(profile);
});
