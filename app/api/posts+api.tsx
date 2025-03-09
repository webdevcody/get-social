import jwt from "jsonwebtoken";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { Post, posts, User, users } from "@/db/schema";
import { withAuth } from "@/utils/withAuth";

export type GetPostResponse = (Post & {
  profile: {
    displayName: string;
  };
})[];

export const GET = withAuth(async (request: Request, user: User) => {
  const allPosts = await db.query.posts.findMany({
    orderBy: [desc(posts.createdAt)],
    limit: 20,
    with: {
      profile: {
        columns: {
          displayName: true,
        },
      },
    },
  });

  return Response.json(allPosts);
});

export const POST = withAuth(async (request: Request, user: User) => {
  const { text } = await request.json();

  if (!text) {
    return Response.json(
      { error: "Your post requires some text" },
      { status: 400 }
    );
  }

  const [newPost] = await db
    .insert(posts)
    .values({
      text,
      userId: user.id,
    })
    .returning();

  return Response.json(newPost);
});
