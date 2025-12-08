import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from "react-router";
import useAuth from "../Hooks/useAuth";

const Footer = () => {
  const { theme } = useAuth();
  return (
    <div className={`bg-neutral ${theme === "light" && "text-base-100"}`}>
      <footer className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 container px-5 mx-auto">
        <div>
          <h6 className="footer-title">
            {" "}
            <Link to="/" className="btn btn-ghost text-xl">
              <span className="text-primary">BookCourier</span>
            </Link>{" "}
          </h6>
          <p>
            BookCourier is a library delivery management system where users can
            request book pickup or delivery from their nearby libraries. The
            system helps students, researchers, and readers borrow and return
            books without physically visiting the library.
          </p>
        </div>
        <ul className="md:ml-auto lg:mx-auto">
          <h6 className="footer-title">Useful Links</h6>
          <li className="list-none link link-hover mb-2"> Blog </li>
          <li className="list-none link link-hover mb-2"> About Us </li>
          <li className="list-none link link-hover mb-2">
            {" "}
            Terms & Condition{" "}
          </li>
          <li className="list-none link link-hover mb-2"> Privacy & Policy </li>
        </ul>

        <ul>
          <h6 className="footer-title">social links</h6>
          <li className="list-none link link-hover mb-2">
            {" "}
            <Link className="flex gap-2 items-center">
              <FaFacebook /> Facebook{" "}
            </Link>{" "}
          </li>
          <li className="list-none link link-hover mb-2">
            {" "}
            <Link className="flex gap-2 items-center">
              <FaSquareXTwitter /> Twitter
            </Link>{" "}
          </li>
          <li className="list-none link link-hover mb-2">
            {" "}
            <Link className="flex gap-2 items-center">
              <FaLinkedin /> Linkedin{" "}
            </Link>{" "}
          </li>
          <li className="list-none link link-hover mb-2">
            {" "}
            <Link className="flex gap-2 items-center">
              <FaInstagram /> Instagram
            </Link>{" "}
          </li>
        </ul>
        <p className="text-center mt-7 pt-7 md:col-span-2 lg:col-span-3 border-t">
          Copyright © 2025 - All right reserved
        </p>
      </footer>
    </div>
  );
};

export default Footer;
