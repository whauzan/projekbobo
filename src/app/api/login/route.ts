import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { getUserByEmail } from "@/lib/db/user";

import { Login, LoginSchema } from "@/schema/AuthSchema";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = (await req.json()) as Login;
    const validatedFields = await LoginSchema.safeParse({ email, password });

    if (!validatedFields.success) {
      return NextResponse.json({
        message: "Login failed!",
        data: null,
        error: validatedFields.error.flatten().fieldErrors,
      });
    }

    const { email: validatedEmail, password: validatedPassword } =
      validatedFields.data;

    const existingUser = await getUserByEmail(validatedEmail);

    if (!existingUser) {
      return NextResponse.json({
        message: "Login failed!",
        data: null,
        error: {
          email: "Email does not exist!",
        },
      });
    }

    const comparePassword = await bcryptjs.compare(
      validatedPassword,
      existingUser.password as string,
    );

    if (!comparePassword) {
      return NextResponse.json({
        message: "Login failed!",
        data: null,
        error: {
          password: "Invalid credentials!",
        },
      });
    }

    return NextResponse.json({
      success: "Logged in successfully!",
      data: { name: existingUser.name, email: existingUser.email },
      error: null,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
