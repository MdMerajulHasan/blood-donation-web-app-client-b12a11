import React from "react";
import footerBg from "../assets/footer_image.avif";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaFacebook } from "react-icons/fa";
import { LiaLinkedin } from "react-icons/lia";
import { BiX } from "react-icons/bi";
const Footer = () => {
  const { user } = useAuth();

  return (
    <div
      className="bg-cover bg-no-repeat space-y-5 bg-center p-30 mt-5 md:mt-10 text-white font-bold flex flex-col-reverse md:flex-row justify-around"
      style={{
        backgroundImage: `url(${footerBg})`,
      }}
    >
      <div>
        <h5 className="text-xl">Useful Links</h5>
        <ul className="space-y-1">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/donation-requests">
            <li>Donation Requests</li>
          </Link>

          {user && (
            <Link to="/donation-requests">
              <li>Donate Us</li>
            </Link>
          )}
        </ul>
      </div>
      <div>
        <h5 className="text-xl">Find Us On</h5>
        <ul className="space-y-1">
          <li>
            <FaFacebook size={30}></FaFacebook>
          </li>
          <li>
            <LiaLinkedin size={30}></LiaLinkedin>
          </li>
          <li>
            <BiX size={30}></BiX>
          </li>
        </ul>
      </div>
      <div>
        <div className="w-15 md:w-20 lg:w-30 h-15 md:h-20 lg:h-30 mx-auto">
          <img src="/src/assets/blood_donation_icon.jpg" alt="logo" />{" "}
        </div>
        <h5 className="text-center text-xl md:text-2xl lg:text-4xl">
          Red Help
        </h5>
      </div>
    </div>
  );
};

export default Footer;
