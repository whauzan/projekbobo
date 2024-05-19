"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormError,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSuccess,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";

import { NewPassword, NewPasswordSchema } from "@/schema/AuthSchema";

import { newPassword } from "../action";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? undefined;

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<NewPassword>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: NewPassword) {
    setError("");
    setSuccess("");

    console.log(values);

    startTransition(() => {
      newPassword(values, token).then((response) => {
        setError(response?.error);
        setSuccess(response?.success);
      });
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="******"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <Button className="w-full" disabled={isPending} type="submit">
          Reset password
        </Button>
      </form>
    </Form>
  );
};

export default NewPasswordForm;
