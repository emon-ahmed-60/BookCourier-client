import React from "react";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import { Link } from "react-router";

const MyWishList = () => {
  const instance = UseAxios();
  const { user } = useAuth();
  const { data: wishlists = [], isLoading } = useQuery({
    queryKey: ["my-wishlists", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/wishlist?email=${user?.email}`);
      return res.data;
    },
  });

  return (
    <>
      <h2>All of my wishlist {wishlists.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Title</th>
              <th className="text-center">Author</th>
              <th className="text-center">Stock_count</th>
              <th className="text-center">Added_at</th>
              <th className="text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="text-center">
                <td>
                  <span className="loading loading-dots loading-xl"></span>
                </td>
              </tr>
            ) : (
              wishlists.map((wishlist, idx) => {
                return (
                  <tr key={wishlist._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{wishlist.title}</td>
                    <td className="text-center">{wishlist.author}</td>
                    <td className="text-center">{wishlist.stock_count}</td>
                    <td className="text-center">{wishlist.added_at}</td>
                    <td className="text-center">
                      <Link
                        to={`/book-details/${wishlist._id}`}
                        className="btn btn-primary"
                      >
                        view details
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyWishList;
