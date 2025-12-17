import React from "react";

import bookOne from "../assets/book-1.jpg";
import bookTwo from "../assets/book-2.jpg";
import bookThree from "../assets/book-3.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={2000}
      showThumbs={false}
      showStatus={false}
      renderArrowPrev={(clickHandler) => {
        return (
          <button
            type="button"
            onClick={clickHandler}
            className="cursor-pointer text-primary absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/70 rounded-full shadow-lg hover:bg-white transition duration-300"
            aria-label="Previous Slide"
          >
            <BiChevronLeft className="w-6 h-6" />
          </button>
        );
      }}
      renderArrowNext={(clickHandler) => {
        return (
          <button
            type="button"
            onClick={clickHandler}
            className="cursor-pointer text-primary absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-white/70 rounded-full shadow-lg hover:bg-white transition duration-300"
            aria-label="Next Slide"
          >
            <BiChevronRight className="w-6 h-6" />
          </button>
        );
      }}
    >
      <div>
        <div className="bg-background-light flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <section className="rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col-reverse md:flex-row items-center">
                <div className="w-full md:w-1/2 p-2 md:p-8 lg:p-12 text-center md:text-left">
                  <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                    The Pages of Legacy: World of Classic Literature
                  </h1>
                  <p className="text-sm my-4">
                    The timeless novels and poems of world literature, delivered
                    right to your doorstep. Find the best classics, from Tagore
                    to Shakespeare, and beyond.
                  </p>
                  <Link to="/books" className="btn btn-primary">
                    Explore All Books
                  </Link>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    alt="A collection of three neatly folded t-shirts in white, grey, and black, next to a pair of white sneakers."
                    className="w-full h-full object-cover"
                    src={bookOne}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-background-light flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <section className="rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col-reverse md:flex-row items-center">
                <div className="w-full md:w-1/2 p-2 md:p-8 lg:p-12 text-center md:text-left">
                  <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                    Knowledge Quest: Frontiers of Science & Research
                  </h1>
                  <p className="text-sm my-4">
                    The largest collection of newly published books on science,
                    technology, and research to fuel your studies and curiosity.
                    Request your essential reads today!
                  </p>
                  <Link to="/books" className="btn btn-primary">
                    Explore All Books
                  </Link>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    alt="A collection of three neatly folded t-shirts in white, grey, and black, next to a pair of white sneakers."
                    className="w-full h-full object-cover"
                    src={bookTwo}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-background-light flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <section className="rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col-reverse md:flex-row items-center">
                <div className="w-full md:w-1/2 p-2 md:p-8 lg:p-12 text-center md:text-left">
                  <h1 className="text-xl lg:text-2xl font-bold leading-tight">
                    Mind Fuel: Bestseller Fiction & Thrillers
                  </h1>
                  <p className="text-sm my-4">
                    Exciting mysteries, psychological thrillers, and the latest
                    popular fiction titles. Get your next captivating read
                    delivered with just one click.
                  </p>
                  <Link to="/books" className="btn btn-primary">
                    Explore All Books
                  </Link>
                </div>
                <div className="w-full md:w-1/2">
                  <img
                    alt="A collection of three neatly folded t-shirts in white, grey, and black, next to a pair of white sneakers."
                    className="w-full h-full object-cover"
                    src={bookThree}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
