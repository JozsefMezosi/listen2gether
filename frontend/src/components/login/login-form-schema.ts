import { z } from "zod";

const EMAIL_ERROR_MESSAGE =
    "The value of the email must a valid email address!";
export const loginFormSchema = z.object({
    email: z
        .string({ message: EMAIL_ERROR_MESSAGE })
        .email(EMAIL_ERROR_MESSAGE),
    password: z.string({ message: "The password is required!" }),
});

export type LoginUser = z.infer<typeof loginFormSchema>;
