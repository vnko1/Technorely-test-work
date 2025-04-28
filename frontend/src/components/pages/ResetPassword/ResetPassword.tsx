import React from "react";
import { Link } from "react-router";

import { Route } from "@/types";
import { ResetPasswordForm } from "./components";

const ResetPassword: React.FC = () => {
  return (
    <main className="page">
      <section className="section">
        <div className="paper gap-2 md:max-w-3/4">
          <ResetPasswordForm />
          <Link className="mx-auto link" to={Route.LOGIN}>
            Log In
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
