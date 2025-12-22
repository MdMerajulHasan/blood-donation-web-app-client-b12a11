import React from "react";
import error404 from "../../assets/error404.jpg";
import { Link } from "react-router";
const Error404 = () => {
  return (
    <div className="space-y-2">
      <img
        className="w-[300px] md:w-[600px] lg:w-[800px] h-[200px] md:h-96 mx-auto my-5"
        src={error404}
        alt="error image"
      />
      <div className="flex justify-center items-center">
        <Link to="/" className="bg-green-600 px-2 py-1 rounded-sm text-white">
          Back To Home
        </Link>
      </div>
    </div>
  );
};

export default Error404;
