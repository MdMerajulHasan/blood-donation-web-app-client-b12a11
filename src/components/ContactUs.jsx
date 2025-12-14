import React from "react";
import { BiPhone } from "react-icons/bi";

const ContactUs = () => {
  return (
    <div className="bg-base-300 space-y-2 md:space-y-5 py-2 md:py-5 mt-5 md:mt-10 rounded-md">
      <h2 className="text-red-600 text-4xl font-bold text-center">
        Contact Us
      </h2>

      <form className="space-y-2 md:space-y-5">
        <div className="flex flex-col md:px-2 md:flex-row gap-2 md:gap-5 justify-center items-center">
          <div className="w-11/12 md:w-1/2">
            <legend className="fieldset-legend">Name*</legend>
            <input
              className="input w-full"
              type="text"
              name="name"
              required
              placeholder="Your name"
            />
            <legend className="fieldset-legend">Company</legend>
            <input
              className="input w-full"
              type="text"
              name="company"
              placeholder="Company name"
            />
            <legend className="fieldset-legend">Your Position</legend>
            <input
              className="input w-full"
              type="text"
              name="position"
              placeholder="Position in company"
            />
          </div>
          <div className="w-11/12 md:w-1/2">
            <legend className="fieldset-legend">Email*</legend>
            <input
              type="email"
              required
              name="email"
              className="input w-full"
              placeholder="Your email"
            />
            <legend className="fieldset-legend">Country</legend>
            <input
              type="text"
              name="country"
              className="input w-full"
              placeholder="Company position"
            />
            <legend className="fieldset-legend">Phone</legend>
            <input
              type="text"
              name="phone"
              className="input w-full"
              placeholder="Phone number"
            />
          </div>
        </div>
        <div className="w-11/12 md:w-auto mx-auto md:mx-2">
          <legend className="fieldset-legend">Message*</legend>
          <textarea
            className="textarea w-full"
            required
            placeholder="Drop Your Message Here"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-linear-to-br mx-auto from-red-600 to-red-300 text-white lg:py-1 w-11/12 md:w-40 lg:w-52 border font-bold md:text-lg border-white rounded-md flex gap-2 justify-center items-center"
        >
          Contact
        </button>
      </form>
      <div className="divider">OR</div>
      <div className="text-red-600 font-bold md:text-lg flex items-center justify-center">
        <BiPhone></BiPhone>Call: 01796596995
      </div>
    </div>
  );
};

export default ContactUs;
