export async function signUp(email: string, password: string) {
  return fetch("/api/sign-up", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}

export async function signIn(email: string, password: string) {
  return fetch("/api/sign-in", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok) {
      return await response.json();
    } else {
      const error = await response.json();
      throw new Error(error.error);
    }
  });
}
