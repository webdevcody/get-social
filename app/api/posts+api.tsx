import jwt from "jsonwebtoken";
import { db } from "@/db";
import { desc, eq } from "drizzle-orm";
import { Post, posts, users } from "@/db/schema";

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

export type GetPostResponse = (Post & {
  profile: {
    displayName: string;
  };
})[];

export async function GET(request: Request) {
  const user = await getUser(request);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

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
}

export async function POST(request: Request) {
  const { text } = await request.json();

  if (!text) {
    return Response.json(
      { error: "Your post requires some text" },
      { status: 400 }
    );
  }

  const user = await getUser(request);

  if (!user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [newPost] = await db
    .insert(posts)
    .values({
      text,
      userId: user.id,
    })
    .returning();

  return Response.json(newPost);
}
