import React from "react";
import { Link } from "react-router";
import useAuth from "../Hooks/UseAuth";
import { motion } from "framer-motion";
const EachBook = ({ book }) => {
  const { title, image_url, author, stock_count, _id } = book;
  const { theme } = useAuth();
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 1,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={`card ${
        theme === "light" ? "bg-base-100" : "bg-gray-800"
      } shadow-sm`}
    >
      <figure>
        <img src={image_url} alt="book" />
      </figure>
      <div className="card-body">
        <h2 className="card-title text-neutral">{title}</h2>

        <p className="font-semibold">
          stock_count: <span className="text-accent">{stock_count}</span>{" "}
        </p>

        <p className="font-semibold">author : {author}</p>

        <div className="card-actions">
          <Link to={`/book-details/${_id}`} className="btn btn-primary w-full">
            view details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EachBook;
