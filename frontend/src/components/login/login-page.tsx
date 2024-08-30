"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Input } from "../ui/input";
import { loginFormSchema, LoginUser } from "./login-form-schema";
import { useForm } from "react-hook-form";
import { login } from "@/actions/login";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<LoginUser>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit = useCallback(async (dto: LoginUser) => {
    setIsLoading(true);
    try {
      await login(dto);
    } catch (error) {
      //todo alert
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, []);

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
            <Button isLoading={isLoading} type="submit" className="w-28 m-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
  return <div>LoginPage</div>;
};
