import React, { use, useState } from "react";
import { Link, useLocation } from "react-router";
import { CgLogOut } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";

import { formatePath, getRoutes, formatText } from "@/utils";
import { AppContext } from "@/context";
import { CustomIconButton, Logo, Menu, Theme } from "@/components";

const Navbar: React.FC = () => {
  const [show, setShow] = useState(false);
  const currentPath = useLocation();
  const { isLoading, logout, user } = use(AppContext);

  const links = getRoutes(!!user, user?.role);

  const handleLogout = () => {
    setShow(false);
    logout();
  };

  return (
    <header className="fixed z-10 -top-1 w-screen bg-sky-300 dark:bg-sky-950">
      <div className="wrapper flex items-center justify-between">
        <Logo />
        <nav className="hidden md:block">
          <ul className="flex gap-10">
            {!isLoading
              ? links.map((path) => {
                  return (
                    <li key={path}>
                      <Link
                        className={`link ${
                          path === currentPath.pathname
                            ? "text-accent dark:text-accent-dark"
                            : ""
                        }`}
                        to={path}
                      >
                        {formatePath(path)}
                      </Link>
                    </li>
                  );
                })
              : null}
          </ul>
        </nav>
        <div className="hidden md:flex gap-4 items-center">
          {user ? <p>{formatText(user.role)}</p> : null}
          <Theme />
          {user && !isLoading ? (
            <CustomIconButton onClick={logout}>
              <CgLogOut />
            </CustomIconButton>
          ) : null}
        </div>
        <CustomIconButton
          sx={{ display: { md: "none" } }}
          onClick={() => setShow(true)}
        >
          <GiHamburgerMenu />
        </CustomIconButton>
      </div>
      <Menu
        currentPath={currentPath.pathname}
        show={show}
        setShow={setShow}
        links={links}
        isAuth={!!user}
        logout={handleLogout}
        role={user?.role}
      />
    </header>
  );
};

export default Navbar;
