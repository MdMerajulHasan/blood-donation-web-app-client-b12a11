import React from "react";
import Banner from "../../components/Banner";
import ContactUs from "../../components/ContactUs";
import Footer from "../../components/Footer";

const Home = () => {
  return (
    <div>
      <div className="w-11/12 mx-auto">
        <Banner></Banner>
        <ContactUs></ContactUs>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
