"use server";

import { generatePasswordResetToken } from "@/lib/db/tokens";
import { getUserByEmail } from "@/lib/db/user";
import { sendPasswordResetEmail } from "@/lib/mail";

import { Reset, ResetSchema } from "@/schema/AuthSchema";

export const reset = async (values: Reset) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid email" };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "Email not found" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return { success: "Reset email sent" };
};
