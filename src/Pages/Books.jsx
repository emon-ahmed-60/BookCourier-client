import React, { useState } from "react";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Hooks/UseAxios";
import EachBook from "../Components/EachBook";

const Books = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("");
  const { theme, user } = useAuth();
  const instance = UseAxios();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", user?.email, search.length, order.length],
    queryFn: async () => {
      const res = await instance.get(`/books?search=${search}&order=${order}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2
        className={`text-4xl font-extrabold text-center ${
          theme === "light" ? "text-neutral" : "text-white"
        }`}
      >
        All Books
      </h2>
      <div className="my-8 flex flex-col md:flex-row gap-4 justify-between items-center">
        <form onChange={(e) => setSearch(e.target.value)} className="w-full">
          <label className="input">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" placeholder="Search Books" />
          </label>
        </form>
        <select onChange={(e) => setOrder(e.target.value)} className="select">
          <option selected disabled={true}>
            Sort by Price
          </option>
          <option value={"desc"}>High - Low</option>
          <option value={"asc"}>Low - High</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          <div className="text-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        ) : (
          books.map((book) => <EachBook key={book._id} book={book} />)
        )}
      </div>
    </div>
  );
};

export default Books;
