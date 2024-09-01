"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { loginFormSchema, LoginUser } from "./login-form-schema";
import { useForm } from "react-hook-form";
import { api } from "@/api";
import { LoginUserResposne } from "@/api/api.types";
import { useRouter } from "next/navigation";

export const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<LoginUser>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: { email: "", password: "" },
    });
    const router = useRouter();

    const onSubmit = useCallback(
        async (dto: LoginUser) => {
            setIsLoading(true);
            try {
                const response = await api.auth.authControllerLoginUser(dto, {
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                const { redirectTo } =
                    (await response.json()) as LoginUserResposne;
                if (redirectTo) {
                    window.location.href = redirectTo;
                    return;
                }
                router.push("/");
            } catch (error) {
                //todo alert
                console.log({ error });
            } finally {
                setIsLoading(false);
            }
        },
        [router],
    );

    return (
        <div className="grid justify-items-center content-center h-screen">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="border border-gray-200 rounded p-5"
                >
                    <h1 className=" text-center">Good to see you back!</h1>

                    <div className="gap-5 grid w-[24rem]">
                        <Input
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="john.doe@email.com"
                        />
                        <Input
                            control={form.control}
                            name="password"
                            type="password"
                            label="Password"
                            placeholder="***********"
                        />
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            className="w-28 m-auto"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};
