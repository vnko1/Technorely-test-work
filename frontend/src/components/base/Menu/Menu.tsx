import React, { useEffect } from "react";
import { Link } from "react-router";
import clsx from "clsx";
import { MdClose } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";

import { Role, Route } from "@/types";
import { formatePath, formatText } from "@/utils";
import { CustomIconButton, Theme } from "@/components";

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  currentPath: string;
  links: Route[];
  isAuth: boolean;
  role?: Role;
  logout: () => void;
}
const Menu: React.FC<Props> = ({
  setShow,
  show,
  links,
  currentPath,
  isAuth,
  logout,
  role,
}) => {
  useEffect(() => {
    if (show) {
      document.body.classList.add("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show]);

  return (
    <div
      className={clsx(
        "md:hidden fixed top-0 left-0 right-0 bottom-0 px-10 py-8 bg-neutral-400 dark:bg-neutral-950 z-50 flex flex-col gap-10 transition-all duration-300",
        show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      )}
    >
      <CustomIconButton
        sx={{ marginLeft: "auto" }}
        onClick={() => setShow(false)}
      >
        <MdClose />
      </CustomIconButton>
      <nav className="w-full">
        <ul className="flex flex-col gap-10">
          {links.map((path) => (
            <li key={path}>
              <Link
                className={`link ${
                  path === currentPath
                    ? "text-accent dark:text-accent-dark"
                    : ""
                }`}
                to={path}
              >
                {formatePath(path)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {role ? <p>{formatText(role)}</p> : null}
      <div className="flex items-center gap-10 justify-end">
        <Theme />
        {isAuth ? (
          <CustomIconButton onClick={logout}>
            <CgLogOut />
          </CustomIconButton>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
