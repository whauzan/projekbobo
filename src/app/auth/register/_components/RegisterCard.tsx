import React from "react";

import AuthCardWrapper from "@/app/auth/_components/AuthCardWrapper";

import RegisterForm from "./RegisterForm";

const RegisterCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Create an account to continue!"
      backButtonLabel="Already have an account?"
      backButtonHref="/login"
      showSocial
    >
      <RegisterForm />
    </AuthCardWrapper>
  );
};

export default RegisterCard;
