import React from "react";
import { Typewriter } from "react-simple-typewriter";
import bannerPhoto from "../../src/assets/donating_blood_banner.jpeg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-base-200 md:w-2/3 lg:w-1/2 mx-auto space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
      <div className="text-red-600 text-4xl font-bold text-center">
        <Typewriter
          words={["Donate Blood", "Save Lives", "Be A Hero"]}
          loop
          cursor
        ></Typewriter>
      </div>
      <img
        className="w-11/12 md:w-auto mx-auto rounded-md"
        src={bannerPhoto}
        alt="banner photo"
      />
      <div className="flex flex-col w-11/12 mx-auto md:flex-row justify-center items-center gap-2 md:gap-5">
        <Link
          to="/registration"
          className="bg-linear-to-br from-red-600 to-red-300 text-white lg:py-1 w-full md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
        >
          Join as a donor
        </Link>
        <Link
          to="/search-donors"
          className="bg-linear-to-br from-red-600 to-red-300 text-white lg:py-1 w-full md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
        >
          Search Donors
        </Link>
      </div>
    </div>
  );
};

export default Banner;
