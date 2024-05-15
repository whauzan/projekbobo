"use server";

import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Login, LoginSchema } from "@/schema/AuthSchema";

export const login = async (values: Login) => {
  try {
    const validatedFields = await LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const { email: validatedEmail, password: validatedPassword } =
      validatedFields.data;

    await signIn("credentials", {
      email: validatedEmail,
      password: validatedPassword,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invaid credentials!",
          };
        default:
          return {
            error: "Something went wrong!",
          };
      }
    }
    throw error;
  }
};
