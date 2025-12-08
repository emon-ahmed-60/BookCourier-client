import React from "react";

import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { ToastContainer } from "react-toastify";

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-5 my-10">
        <Outlet />
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default RootLayout;
