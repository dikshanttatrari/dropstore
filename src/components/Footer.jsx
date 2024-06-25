import React from "react";
import { Link } from "react-router-dom";
import "../index.css";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";

export default function Footer() {
  const goToInsta = () => {
    window.open("https://www.instagram.com/dropstore.live/");
  };
  const goToWhatsapp = () => {
    window.open("https://whatsapp.com/channel/0029VaDOQW105MUmXuAbFl1B");
  };

  const goToTelegram = () => {
    window.open("https://t.me/dropstoredotlive");
  };

  return (
    <footer id="footer" className="bg-[#222] container min-w-full">
      <div className="flex md:flex-row justify-between flex-col footer">
        <div className="ml-10 w-[33%] mt-2 about-div">
          <h1 className="text-gray-400 mb-2 text-lg">ABOUT</h1>
          <p className="text-sm about">
            Krishna General Store is now online. Dropstore is powered by Krishna
            General Store. It is designed to convert Krishna General Store to an
            online manner so that everyone can have their products delivered to
            their door.
          </p>
          <h1 className="text-gray-400 mt-2 text-lg">SOCIAL</h1>
          <div className="flex flex-row gap-2 social">
            <div className="bg-[#e1306c] rounded-full p-1">
              <FaInstagram
                onClick={goToInsta}
                className="p-1 hover:scale-125 cursor-pointer text-3xl"
              />
            </div>
            <div className="bg-[#25d366] rounded-full p-1">
              <FaWhatsapp
                onClick={goToWhatsapp}
                className="hover:scale-125 p-1 cursor-pointer text-3xl"
              />
            </div>

            <div className="bg-[#0088cc] p-1 rounded-full">
              <TbBrandTelegram
                onClick={goToTelegram}
                className="hover:scale-125 p-1 cursor-pointer text-3xl"
              />
            </div>
          </div>
        </div>
        <div className="mr-20 mt-2 useful-links">
          <h1 className="text-gray-400 mb-1 mt-2 text-lg">USEFUL LINKS</h1>
          <ul className="flex flex-col">
            <Link className="text-md hover:text-[#e23854]" to={"/"}>
              Home
            </Link>
            <Link className="text-md hover:text-[#e23854]" to={"/about-us"}>
              About Us
            </Link>
            <Link className="text-md hover:text-[#e23854]" to={"/contact-us"}>
              Contact Us
            </Link>
            <Link className="text-md hover:text-[#e23854] mb-2" to={"/faqs"}>
              FAQs
            </Link>
          </ul>
        </div>
        <div className="mr-10 mt-2 address-div">
          <h1 className="text-gray-400 text-lg">ADDRESS</h1>
          <p className="text-sm address">
            Krishna General Store, Bastey, Pithoragarh Dharchula Road, Post
            Office - Siltham, 262501, Uttarakhand, India
          </p>
          <h1 className="text-gray-400 mt-2 text-lg mb-1">CONTACT</h1>
          <div className="flex flex-col">
            <Link
              className="hover:text-[#e23854] text-sm"
              to={"tel::9412925360"}
            >
              +91 94129 25360
            </Link>
            <Link
              className="hover:text-[#e23854] text-sm"
              to={"tel::9837689005"}
            >
              +91 98376 89005
            </Link>

            <Link
              className="hover:text-[#e23854] text-sm"
              to={"mailto:dropstoredotlive@gmail.com"}
            >
              dropstoredotlive@gmail.com
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#e28854] mt-2">
        <p className="text-center p-2 font-semibold">
          © {new Date().getFullYear()} - DropStore | All rights reserved
        </p>
      </div>
    </footer>
  );
}
