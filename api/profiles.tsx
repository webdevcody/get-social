import { Profile } from "@/db/schema";

export async function getMyProfile(token: string): Promise<Profile> {
  return fetch("/api/profiles", {
    method: "GET",
    headers: {
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

export async function updateProfile(displayName: string, token: string) {
  return fetch("/api/profiles", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ displayName }),
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
