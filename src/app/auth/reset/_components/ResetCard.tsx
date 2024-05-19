import React from "react";

import AuthCardWrapper from "@/app/auth/_components/AuthCardWrapper";

import ResetForm from "./ResetForm";

const ResetCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Forgot your password?"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <ResetForm />
    </AuthCardWrapper>
  );
};

export default ResetCard;
