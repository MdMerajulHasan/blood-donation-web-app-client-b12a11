import React from "react";
import Logo from "../../../components/Logo";
import { NavLink } from "react-router";
import { GiPayMoney } from "react-icons/gi";

const Navbar = () => {
  const links = (
    <>
      <NavLink
        to="/donation-requests"
        className="text-white lg:py-1 lg:w-52 border font-bold md:text-lg border-white rounded-md text-center"
      >
        Donation Requests
      </NavLink>
      <NavLink
        to="/donate"
        className="text-white lg:py-1 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
      >
        Donate Us <GiPayMoney className="lg:h-8 lg:w-8" />
      </NavLink>
    </>
  );

  return (
    <div className="navbar sticky py-0 z-10 md:py-1 top-0 bg-linear-to-br from-red-600 to-red-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 md:w-15 h-8 md:h-15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content space-y-1 bg-linear-to-br from-red-600 to-red-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-5">{links}</ul>
      </div>
      <div className="navbar-end">
        <NavLink
          to="/login"
          className="text-white py-1 w-30 md:w-40 lg:w-52 bg-transparent border font-bold text-base md:text-lg border-white rounded-md text-center"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
