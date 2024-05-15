import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/lib/db/user";

import { Register, RegisterSchema } from "@/schema/AuthSchema";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = (await req.json()) as Register;
    const validatedFields = await RegisterSchema.safeParse({
      name,
      email,
      password,
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        message: "Registration failed!",
        data: null,
        error: validatedFields.error.flatten().fieldErrors,
      });
    }

    const {
      name: validatedName,
      email: validatedEmail,
      password: validatedPassword,
    } = validatedFields.data;

    const hashedPassword = await bcryptjs.hash(validatedPassword, 10);

    const existingUser = await getUserByEmail(validatedEmail);

    if (existingUser) {
      return NextResponse.json({
        message: "Registration failed!",
        data: null,
        error: {
          email: "Email already exists!",
        },
      });
    }

    await db.user.create({
      data: {
        name: validatedName,
        email: validatedEmail,
        password: hashedPassword,
      },
    });

    // TODO: Send email verification

    return NextResponse.json({
      success: "Registered successfully!",
      data: { validatedName, validatedEmail },
      error: null,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
