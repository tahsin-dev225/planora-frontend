"use server";

import { cookies } from "next/headers";

export async function setAuthCookies(
  token: string,
  accessToken: string,
  refreshToken: string
) {
  const cookieStore = await cookies();

  if (token) {
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
  }

  if (accessToken) {
    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 1 * 24 * 60 * 60, // 1 day
    });
  }

  if (refreshToken) {
    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
  }
}

export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
}
