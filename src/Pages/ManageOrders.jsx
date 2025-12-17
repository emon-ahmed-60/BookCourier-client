import React, { useRef, useState } from "react";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const ManageOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const instance = UseAxios();
  const { user } = useAuth();
  const bookRef = useRef(null);
  const { register, handleSubmit } = useForm();
  // instance.get(`/`)
  const {
    data: Orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarian-orders", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/library-orders?email=${user?.email}`);
      return res.data;
    },
  });

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    bookRef.current.showModal();
  };

  const handleEditOrder = (data) => {
    console.log(data, selectedOrder._id);
    const update = data;
    instance.patch(`/book-update/${selectedOrder._id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`Book is ${update.bookStatus} successfully`);
        refetch();
        bookRef.current.close();
      }
    });
  };
  return (
    <>
      <h2>All of my orders {Orders.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Title</th>
              <th className="text-center">Added_at</th>
              <th className="text-center">BookStatus</th>
              <th className="text-center">price</th>
              <th className="text-center">Edit</th>
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
              Orders.map((order, idx) => {
                return (
                  <tr key={order._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{order.title}</td>
                    <td className="text-center">{order.date}</td>
                    <td className="text-center">{order.status}</td>
                    <td className="text-center">{order.price}</td>
                    <td className="text-center">
                      {" "}
                      <button
                        onClick={() => handleShowModal(order)}
                        className="btn btn-primary"
                      >
                        <FaEdit />
                      </button>{" "}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <dialog ref={bookRef} className="modal">
        <div className="modal-box">
          <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-8">
            <div className="card-body">
              <h1 className="font-bold text-2xl text-center text-base-content">
                Change Book Status
              </h1>
              <form onSubmit={handleSubmit(handleEditOrder)}>
                <fieldset className="fieldset">
                  <label className="label">Book Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Book Name"
                    defaultValue={selectedOrder?.title}
                    readOnly
                  />

                  <label className="label">Book Status</label>
                  <select
                    {...register("bookStatus")}
                    defaultValue="Pick book status"
                    className="select"
                  >
                    <option>pending</option>
                    <option>shipped</option>
                    <option>delivered</option>
                  </select>

                  <label className="label">Book Price</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="Book Price"
                    defaultValue={selectedOrder?.price}
                    readOnly
                  />
                  <button type="submit" className="btn btn-neutral mt-4">
                    Save Changes
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ManageOrders;
