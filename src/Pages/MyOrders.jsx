import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/UseAuth";
import UseAxios from "../Hooks/UseAxios";
import { Link } from "react-router";

const MyOrders = () => {
  const { user, loading } = useAuth();
  const instance = UseAxios();

  if (loading) {
    return <div>Loading...</div>;
  }

  const { data: myOrders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/bookorders?email=${user?.email}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h2>All of my parcels {myOrders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Title</th>

              <th className="text-center">Order Date</th>
              <th className="text-center">Order status</th>
              <th className="text-center">Payment status</th>
              <th className="text-center">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {myOrders.map((parcel, idx) => {
              return (
                <tr key={parcel._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-center">{parcel.title}</td>
                  <td className="text-center">{parcel.date}</td>
                  <td className="text-center">{parcel.status}</td>
                  <td className="text-center">
                    {parcel.paymentStatus}
                  </td>

                  <td className="flex flex-wrap md:flex-nowrap gap-2 justify-center">
                    <button className="flex-1/2 btn btn-square text-white w-full btn-primary">
                      cancel
                    </button>
                   <button className="flex-1/2 btn w-full btn-square text-white bg-primary">
                      {" "}
                      Pay Now
                    </button>
                  </td>
                 
                  
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyOrders;
