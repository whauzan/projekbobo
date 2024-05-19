import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z.string({
    message: "Password is required.",
  }),
});

export type Login = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export type Register = z.infer<typeof RegisterSchema>;

export const ResetSchema = z.object({
  email: z
    .string({
      message: "Email is required.",
    })
    .email({
      message: "Invalid email address.",
    }),
});

export type Reset = z.infer<typeof ResetSchema>;

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});

export type NewPassword = z.infer<typeof NewPasswordSchema>;
