import { FaDiscord, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white ">
      <div className="container flex flex-col items-center justify-between p-6 mx-auto space-y-4 sm:space-y-0 sm:flex-row">
        <Link to={"/"}>
          <img
            className="w-auto h-7"
            src="https://merakiui.com/images/full-logo.svg"
            alt=""
          />
        </Link>

        <p className="text-sm text-gray-60">
          © Copyright 2021. All Rights Reserved.
        </p>

        <div className="flex -mx-2">
          <Link
            to={"https://discord.com/users/987984390929928242"}
            target="__blank"
            // href="#"
            // className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500 "
            // aria-label="Reddit"
          >
            <FaDiscord className="text-2xl text-[#5661EA] " />
          </Link>

          <Link
            to={"https://www.facebook.com/himu.hashanuzzaman"}
            target="__blank"
            className="mx-2 text-gray-600 transition-colors duration-300 hover:text-blue-500 "
            aria-label="Facebook"
          >
            <FaFacebook className="text-2xl text-[#106AFF] " />
          </Link>

          <Link
            to={"https://www.instagram.com/himuhashanuzzaman/"}
            target="__blank"
            className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500 "
            aria-label="Github"
          >
            <FaInstagram className="text-2xl text-pink-600 " />
          </Link>
          <Link
            to={"https://github.com/HIMU005"}
            target="__blank"
            className="mx-2 text-gray-600 transition-colors duration-300  hover:text-blue-500 "
            aria-label="Github"
          >
            <FaGithub className="text-2xl text-[#080808] " />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
