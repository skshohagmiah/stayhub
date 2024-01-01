import React from "react";
import { FaGlobe } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="md:fixed bottom-0 flex flex-col flex-wrap md:flex-row items-center justify-between max-w-7xl mx-auto left-0 right-0 p-2 bg-white">
      <div className="flex items-center flex-wrap justify-center gap-4 text-sm font-light cursor-pointer ">
        <h3 className="md:text-lg font-medium">&copy; 2024 StayHub Inc .</h3>
        <p>Terms .</p>
        <p>Sitemap .</p>
        <p>Privacy .</p>
        <p>Your Privacy Choices .</p>
      </div>
      <div className="flex items-center md:gap-4 cursor-pointer">
        <FaGlobe />
        <p>English (US)</p>
        <p>$ USD</p>
        Support & Resources
      </div>
    </footer>
  );
};

export default Footer;
