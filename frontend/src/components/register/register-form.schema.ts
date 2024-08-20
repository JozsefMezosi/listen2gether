import { z } from "zod";

const EMAIL_ERROR_MESSAGE = "The value of the email must a valid email address!";
const PASSWORD_INSUFFICIENT_LENGTH = "The password must contain at least 8 characters!";
export const registerFormSchema = z.object({
  user_name: z.string({ message: "The username should not be empty!" }),
  email: z.string({ message: EMAIL_ERROR_MESSAGE }).email(EMAIL_ERROR_MESSAGE),
  password: z
    .string({ message: PASSWORD_INSUFFICIENT_LENGTH })
    .refine((value) => /^.{8,}$/.test(value), PASSWORD_INSUFFICIENT_LENGTH)
    .refine((value) => /^(?=.*[A-Z]).*$/.test(value), "The password must contain at least 1 uppercase character!")
    .refine((value) => /^(?=.*[a-z]).*$/.test(value), "The password must contain at least 1 lowercase character!"),
});

export type RegisterUser = z.infer<typeof registerFormSchema>;
