import React from "react";
import forbidden from "../../assets/forbidden.jpg";
import { Link } from "react-router";
const Forbidden = () => {
  return (
    <div className="space-y-2">
      <img
        className="w-[300px] md:w-[600px] lg:w-[800px] h-[200px] md:h-96 mx-auto my-5"
        src={forbidden}
        alt="forbidden image"
      />
      <div className="flex justify-center items-center">
        <Link to="/" className="bg-green-600 px-2 py-1 rounded-sm text-white">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
