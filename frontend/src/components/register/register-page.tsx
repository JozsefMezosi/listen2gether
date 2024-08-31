"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterUser } from "./register-form.schema";
import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { api, Api } from "@/api";

export const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<RegisterUser>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            email: "",
            password: "",
            user_name: "",
        },
    });

    const router = useRouter();

    const onSubmit = useCallback(
        async (data: RegisterUser) => {
            try {
                setIsLoading(true);
                await api.auth.authControllerRegisterUser(data);
                router.push("/login");
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
                    <h1 className=" text-center">
                        Join our platform and
                        <br /> listen together
                    </h1>

                    <div className="gap-5 grid w-[24rem]">
                        <Input
                            control={form.control}
                            name="user_name"
                            label="Username"
                            placeholder="John Doe"
                        />
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
