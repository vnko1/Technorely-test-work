import React from "react";
import { Link } from "react-router";

import { Route } from "@/types";

const NotFound: React.FC = () => {
  return (
    <main className="page">
      <section className="section">
        <div className="wrapper flex flex-col justify-center items-center gap-10">
          <h1 className="text-8xl">404</h1>
          <p>Page not found</p>
          <Link to={Route.DASHBOARD}>Go home</Link>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
