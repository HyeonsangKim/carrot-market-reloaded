import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionCookie {
  id?: number;
}

export function getSession() {
  return getIronSession<SessionCookie>(cookies(), {
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!,
  });
}

export async function saveSession(userId: number, page: string) {
  const session = await getSession();
  session.id = userId;
  await session.save();
  return redirect(`/${page}`);
}
