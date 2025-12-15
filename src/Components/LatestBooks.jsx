import React from "react";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import EachBook from "./EachBook";

const LatestBooks = () => {
  const instance = UseAxios();
  const { user } = useAuth();

  const { data: books = [], isPending } = useQuery({
    queryKey: ["latest-books", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/books/latest`);
      return res.data;
    },
  });

  if (isPending) {
    return <div className="text-center"><span className="loading loading-dots loading-xl"></span></div>;
  }
  return (
    <>
      <h1 className="text-4xl font-extrabold text-neutral text-center mb-12">Latest Books</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {books.map((book) => (
        <EachBook key={book._id} book={book} />
      ))}
    </div>
      </>
  );
};

export default LatestBooks;
