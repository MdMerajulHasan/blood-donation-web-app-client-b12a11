import React from "react";
import { Typewriter } from "react-simple-typewriter";
import useAuth from "../../hooks/useAuth";

const DashboardHome = () => {
  const { user } = useAuth();
  

  return (
    <div>
      <div className="text-red-600 text-4xl font-bold text-center my-5 md:my-10">
        <Typewriter
          words={[`Welcome ${user.displayName}`]}
          loop
          cursor
        ></Typewriter>
      </div>
      <p>requests</p>
    </div>
  );
};

export default DashboardHome;
