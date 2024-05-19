import React, { Suspense } from "react";

import AuthCardWrapper from "@/app/auth/_components/AuthCardWrapper";

import NewVerificationForm from "./NewVerificationForm";

const NewVerificationCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Suspense>
        <NewVerificationForm />
      </Suspense>
    </AuthCardWrapper>
  );
};

export default NewVerificationCard;
