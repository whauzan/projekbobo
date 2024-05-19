import React, { Suspense } from "react";

import AuthCardWrapper from "@/app/auth/_components/AuthCardWrapper";

import NewPasswordForm from "./NewPasswordForm";

const NewPasswordCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Enter a new password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Suspense>
        <NewPasswordForm />
      </Suspense>
    </AuthCardWrapper>
  );
};

export default NewPasswordCard;
