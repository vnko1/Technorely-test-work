import React from "react";
import { Link, Navigate, useParams } from "react-router";

import { Route } from "@/types";
import { SetPasswordForm } from "./components";

const SetPassword: React.FC = () => {
  const params = useParams();

  if (!params.token) return <Navigate to={Route.LOGIN} />;
  return (
    <main className="page">
      <section className="section">
        <div className="paper gap-2 md:max-w-3/4">
          <SetPasswordForm passwordResetToken={params.token} />
          <Link className="mx-auto link" to={Route.LOGIN}>
            Log In
          </Link>
        </div>
      </section>
    </main>
  );
};

export default SetPassword;
