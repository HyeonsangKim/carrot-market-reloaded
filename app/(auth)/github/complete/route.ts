import db from "@/lib/db";
import { getSession, saveSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { getAccessToken, getUserProfile } from "./utils";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return new Response(null, { status: 400 });
  }

  const access_token = await getAccessToken(code);

  const { id, avatar_url, login } = await getUserProfile(access_token);
  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });
  if (user) {
    await saveSession(user.id, "");
  }

  const usernameExist = await db.user.findUnique({
    where: {
      username: login,
    },
    select: {
      id: true,
    },
  });

  console.log(usernameExist);
  const githubUsername = usernameExist ? login + "_gh" : login;

  const newUser = await db.user.create({
    data: {
      username: githubUsername,
      github_id: id + "",
      avatar: avatar_url,
    },
    select: {
      id: true,
    },
  });

  await saveSession(newUser.id, "profile");
}
