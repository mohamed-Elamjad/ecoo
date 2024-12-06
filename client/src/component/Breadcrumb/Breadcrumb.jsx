import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className="font-[sans-serif] p-4 border-b-[1px] ">
      <ol className="list-reset flex text-blue-500">
        <li>
          <Link
            to="/"
            className="flex items-center text-blue-500 hover:text-blue-600"
          >
            <span className="ml-2">Home</span>
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          return (
            <React.Fragment key={to}>
              <li className="mx-2 font-bold">/</li>
              <li>
                <Link
                  to={to}
                  className="flex items-center text-blue-500 hover:text-blue-600"
                >
                  <span className="ml-2">{pathname.replace(/-/g, " ")}</span>
                </Link>
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
