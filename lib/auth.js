import crypto from "crypto";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SECRET || "soulcrane-default-secret-please-set-ADMIN_SECRET";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "1234";
const COOKIE_NAME = "soulcrane_admin";

function makeToken() {
  return crypto.createHmac("sha256", SECRET).update("ok").digest("hex");
}

export function checkPassword(pw) {
  return typeof pw === "string" && pw === ADMIN_PASSWORD;
}

export function setAuthCookie() {
  cookies().set(COOKIE_NAME, makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
}

export function isAuthed() {
  const c = cookies().get(COOKIE_NAME);
  return !!c && c.value === makeToken();
}
