import React from "react";
import save3Lives from "../assets/one_donate_saves_3_lives.jpg";
import quickProcess from "../assets/blood_donation_steps.jpg";
import freeHealthCheck from "../assets/blood_donation_fast_and_safe.png";
import communityImpact from "../assets/blood_donation_impact_in_community.webp";

const WhyDonate = () => {
  return (
    <div className="bg-base-200 md:px-2 text-red-600 text-center space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
      <h2 className="text-4xl font-bold">Why Donate Blood?</h2>
      <div className="grid w-11/12 md:w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-5">
        <div className="space-y-1 bg-base-300 py-2 rounded-md">
          <h3 className="text-2xl font-bold">Save Lives</h3>
          <p className="text">One donation saves up to three lives.</p>
          <img
            className="h-64 w-11/12 mx-auto rounded-md"
            src={save3Lives}
            alt="one donate save 3 lives photo"
          />
        </div>
        <div className="space-y-1 bg-base-300 py-2 rounded-md">
          <h3 className="text-2xl font-bold">Quick Process</h3>
          <p className="text">Simple and takes only a few minutes.</p>
          <img
            className="h-64 w-11/12 mx-auto rounded-md"
            src={quickProcess}
            alt="one donate save 3 lives photo"
          />
        </div>
        <div className="space-y-1 bg-base-300 py-2 rounded-md">
          <h3 className="text-2xl font-bold">Free Health Check</h3>
          <p className="text">Basic health screening.</p>
          <img
            className="h-64 w-11/12 mx-auto rounded-md"
            src={freeHealthCheck}
            alt="one donate save 3 lives photo"
          />
        </div>
        <div className="space-y-1 bg-base-300 py-2 rounded-md">
          <h3 className="text-2xl font-bold">Community Impact</h3>
          <p className="text">It strengthens communities.</p>
          <img
            className="h-64 w-11/12 mx-auto rounded-md"
            src={communityImpact}
            alt="one donate save 3 lives photo"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyDonate;
