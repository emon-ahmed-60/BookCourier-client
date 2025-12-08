import { BiArrowToRight } from "react-icons/bi";
import useAuth from "../Hooks/UseAuth";

const CTABanner = () => {
  const { theme } = useAuth();
  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 text-white ${
        theme === "light" ? "bg-primary" : "bg-blue-800"
      }`}
    >
      <div className="max-w-6xl mx-auto text-center md:flex md:justify-between md:items-center">
        <div className="md:text-left mb-6 md:mb-0">
          <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
            Get Your Favorite Books Delivered Today!
          </h2>
          <p className="mt-2 text-lg text-blue-100">
            Reading is no longer a hassle; Book Courier brings your library
            right to your doorstep.
          </p>
        </div>

        <div>
          <a
            href="/books"
            className="bg-primary text-white inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
          >
            Start Browsing Books
            <BiArrowToRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
