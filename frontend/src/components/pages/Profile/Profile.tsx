import React, { use } from "react";
import { Link } from "react-router";

import { Endpoints, Route } from "@/types";
import { AppContext } from "@/context";
import { Avatar, UserForm } from "@/components";

const Profile: React.FC = () => {
  const { user } = use(AppContext);
  return (
    <main className="page">
      <section className="section lg:max-w-[60%]">
        <div className="paper ">
          <Avatar user={user} path={Endpoints.AVATAR} />
        </div>

        <div className="paper">
          <UserForm user={user} path={Endpoints.ME} />
        </div>
        <div className="paper">
          <Link className="button w-1/2 mx-auto" to={Route.PASSWORD}>
            Change password
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Profile;
