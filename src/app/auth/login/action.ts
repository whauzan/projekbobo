"use server";

import { AuthError } from "next-auth";

import { generateVerificationToken } from "@/lib/db/tokens";
import { getUserByEmail } from "@/lib/db/user";
import { sendVerificationEmail } from "@/lib/mail";

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

    const existingUser = await getUserByEmail(validatedEmail);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        error: "Email does not exist",
      };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser.email,
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );

      return {
        success: "Confirmation email sent! Please verify your email.",
      };
    }

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
