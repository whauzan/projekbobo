"use server";

import bcryptjs from "bcryptjs";

import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/db/tokens";
import { getUserByEmail } from "@/lib/db/user";
import { sendVerificationEmail } from "@/lib/mail";

import { Register, RegisterSchema } from "@/schema/AuthSchema";

export const register = async (values: Register) => {
  try {
    const validatedFields = await RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return {
        error: "Invalid fields!",
      };
    }

    const {
      name: validatedName,
      email: validatedEmail,
      password: validatedPassword,
    } = validatedFields.data;

    const hashedPassword = await bcryptjs.hash(validatedPassword, 10);

    const existingUser = await getUserByEmail(validatedEmail);

    if (existingUser) {
      return {
        error: "Email already exists!",
      };
    }

    await db.user.create({
      data: {
        name: validatedName,
        email: validatedEmail,
        password: hashedPassword,
      },
    });

    // TODO: Send email verification
    const verificationToken = await generateVerificationToken(validatedEmail);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    );

    return {
      success: "Registered successfully!",
    };
  } catch (error) {
    return { error };
  }
};
