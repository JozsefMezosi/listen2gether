"use server";

import { LoginUser } from "@/components/login/login-form-schema";
import { redirect } from "next/navigation";

export async function login(dto: LoginUser) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
    {
      method: "POST",
      body: JSON.stringify(dto),

      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );
  if (response.redirected) {
    redirect(response.url);
  }
}
