import { GetPostResponse } from "@/app/api/posts+api";

export async function createPost(text: string, token: string) {
  return fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function getPosts(token: string) {
  return fetch("/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(async (response) => {
    if (response.ok) {
      return (await response.json()) as GetPostResponse;
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
