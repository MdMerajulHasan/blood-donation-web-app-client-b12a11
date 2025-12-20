import React from "react";
import useRole from "../hooks/useRole";
import Logo from "../components/Logo";
import { Link, Outlet } from "react-router";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { TbDropletPlus } from "react-icons/tb";

const Dashboard = () => {
  const { role } = useRole();
  console.log(role);
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-2 lg:col-span-1 space-y-5 h-screen sticky top-0 text-white text-xs font-bold bg-linear-to-tr from-red-600 to-red-300">
        <span className="flex justify-center items-center">
          <Logo></Logo>
        </span>
        <Link
          to="/dashboard"
          className="flex items-center gap-0.5"
          title="Home"
        >
          <FaHome size={25} />
          <span className="hidden md:flex">Home</span>
        </Link>
        <Link
          to="/dashboard/my-donation/requests"
          className="flex items-center gap-0.5"
          title="My Donation Requests"
        >
          <BiSolidDonateBlood size={25} />
          <span className="hidden md:flex">Requests</span>
        </Link>
        <Link
          to="/dashboard/create-donation-request"
          className="flex items-center gap-0.5"
          title="Create Donation Requests"
        >
          <TbDropletPlus size={25} />
          <span className="hidden md:flex">Create</span>
        </Link>
      </div>
      <div className="col-span-10 lg:col-span-11 bg-base-200">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
