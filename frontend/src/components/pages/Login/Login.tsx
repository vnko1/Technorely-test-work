import React from "react";
import { Link } from "react-router";

import { Route } from "@/types";
import { LoginForm } from "./components";

const Login: React.FC = () => {
  return (
    <main className="page">
      <section className="section">
        <div className="paper gap-2 md:max-w-3/4">
          <LoginForm />
          <Link to={Route.RESET} className="link mx-auto text-sm">
            Forgot password
          </Link>
        </div>
        <Link className="mx-auto link" to={Route.SIGNUP}>
          Sign Up
        </Link>
      </section>
    </main>
  );
};

export default Login;
