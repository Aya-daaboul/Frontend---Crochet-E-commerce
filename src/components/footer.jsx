import React from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-pink-100 text-[#FF4D8B] py-14 px-6">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-10 text-lg font-medium">
        {/* Logo Column */}
        <div className="flex-1 min-w-[150px] text-center sm:text-left text-2xl font-bold">
          Logo Goes Here
        </div>

        {/* Quick Links */}
        <div className="flex-1 min-w-[150px] text-center sm:text-left">
          <h3 className="font-bold text-xl mb-3">Quick Links</h3>
          <ul className="space-y-1 font-semibold text-lg">
            <li>
              <Link
                to="/home"
                className="text-[#FF4D8B] hover:text-[#FDDA4D] transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-[#FF4D8B] hover:text-[#FDDA4D] transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-[#FF4D8B] hover:text-[#FDDA4D] transition"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        {/* Social Icons */}
        <div className="flex-1 min-w-[150px] text-center sm:text-left">
          <h3 className="font-bold text-xl mb-3">Our Socials</h3>
          <div className="flex justify-center sm:justify-start gap-5 text-3xl">
            <a
              href="https://www.instagram.com/crochet_.by._aya"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-[#FF4D8B] hover:text-[#FDDA4D] transition" />
            </a>
            <a
              href="https://wa.me/96100000000"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-[#FF4D8B] hover:text-[#FDDA4D] transition" />
            </a>
          </div>
        </div>

        {/* Sign Up Button */}
        <div className="flex-1 min-w-[150px] flex justify-center sm:justify-end">
          <Link
            to="/signup"
            className="border-2 border-[#FF4D8B] text-[#FF4D8B] text-lg font-bold px-8 py-3 rounded-full hover:bg-[#FF4D8B] hover:text-white transition"
          >
            Sign up Now
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
