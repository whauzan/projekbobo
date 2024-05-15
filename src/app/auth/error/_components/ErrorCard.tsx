import React from "react";

import AuthCardWrapper from "../../_components/AuthCardWrapper";

const ErrorCard = () => {
  return (
    <AuthCardWrapper
      headerLabel="Oops! Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center">ErrorPage</div>
    </AuthCardWrapper>
  );
};

export default ErrorCard;
