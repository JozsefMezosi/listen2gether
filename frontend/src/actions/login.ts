"use server";

import { api } from "@/api";
import { LoginUser } from "@/components/login/login-form-schema";
import { log } from "console";
import { redirect } from "next/navigation";

export async function login(dto: LoginUser) {
    const response = await api.auth.authControllerLoginUser(dto, {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

    log({ response });
    if (response.redirected) {
        redirect(response.url);
    }

    return response.json();
}
