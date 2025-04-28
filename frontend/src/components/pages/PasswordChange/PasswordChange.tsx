import React from "react";
import { PasswordForm } from "./components";

const PasswordChange: React.FC = () => {
  return (
    <main className="page">
      <section className="section">
        <div className="paper gap-2 md:max-w-3/4">
          <PasswordForm />
        </div>
      </section>
    </main>
  );
};

export default PasswordChange;
