import React from "react";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "../Hooks/UseAxios";
import EachBook from "../Components/EachBook";

const Books = () => {
  const { theme, user } = useAuth();
  const instance = UseAxios();
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books", user?.email],
    queryFn: async () => {
      const res = await instance.get("/books");
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h2
        className={`text-4xl font-extrabold text-center mb-12 ${
          theme === "light" ? "text-neutral" : "text-white"
        }`}
      >
        All Books
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {books.map((book) => (
          <EachBook key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default Books;
