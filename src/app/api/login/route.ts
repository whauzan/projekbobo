import { NextRequest, NextResponse } from "next/server";

import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Login, LoginSchema } from "@/schema/AuthSchema";

export async function POST(req: NextRequest) {
  // try {
  //   const { email, password } = (await req.json()) as Login;
  //   const validatedFields = await LoginSchema.safeParse({ email, password });

  //   if (!validatedFields.success) {
  //     return NextResponse.json({
  //       message: "Login failed!",
  //       data: null,
  //       error: validatedFields.error.flatten().fieldErrors,
  //     });
  //   }

  //   const { email: validatedEmail, password: validatedPassword } =
  //     validatedFields.data;

  //   const existingUser = await getUserByEmail(validatedEmail);

  //   if (!existingUser) {
  //     return NextResponse.json({
  //       message: "Login failed!",
  //       data: null,
  //       error: {
  //         email: "Email does not exist!",
  //       },
  //     });
  //   }

  //   return NextResponse.json({
  //     success: "Logged in successfully!",
  //     data: { name: existingUser.name, email: existingUser.email },
  //     error: null,
  //   });
  // } catch (error) {
  //   console.log(error);

  //   return NextResponse.json({ error });
  // }

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
    await signIn("credentials", {
      email: validatedEmail,
      password: validatedPassword,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error });
  }
}
