import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", passwordBuffer);
  const hashedPassword = Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashedPassword;
}

export async function generateJwt(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!);
}
