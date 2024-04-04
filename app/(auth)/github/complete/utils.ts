export const getAccessToken = async (code: string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();
  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const accessTokenResponse = await fetch(accessTokenURL, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return new Response(null, { status: 400 });
  }
  return access_token;
};

export const getUserProfile = async (access_token: string) => {
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    cache: "no-cache",
  });
  return userProfileResponse.json();
};
export const getUserEmail = async (token: string) => {
  const userEmailsResponse = await fetch("https://api.github.com/user/emails", {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-cache",
  });

  const emails = await userEmailsResponse.json();
  return emails && emails.length > 0 ? emails[0].email : null;
};
