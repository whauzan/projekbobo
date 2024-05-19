import { Suspense } from "react";

import AuthCardWrapper from "@/app/auth/_components/AuthCardWrapper";

import LoginForm from "./LoginForm";

const LoginCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Welcome Back! Please login to your account."
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Suspense>
        <LoginForm />
      </Suspense>
    </AuthCardWrapper>
  );
};

export default LoginCard;
