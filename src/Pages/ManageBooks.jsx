import React, { useRef, useState } from "react";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const instance = UseAxios();
  const { user } = useAuth();
  const bookRef = useRef(null);
  const { register, handleSubmit } = useForm();
  const {
    data: books = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-books", user?.email],
    queryFn: async () => {
      const res = await instance.get("/all-books");
      return res.data;
    },
  });

  const handleShowModal = (book) => {
    setSelectedOrder(book);
    bookRef.current.showModal();
  };

  const handleEditBook = (data) => {
    console.log(data, selectedOrder._id);
    instance.patch(`/all-book/${selectedOrder._id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`Book is ${data.bookStatus} successfully`);
        refetch();
        bookRef.current.close();
      }
    });
  };

  const handleDelete = (book) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this book",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.delete(`/book/${book._id}`).then((res) => {
          if (res.data.deletedBook?.deletedCount) {
            refetch();
            console.log(res.data);
            Swal.fire({
              title: "Deleted!",
              text: "This book has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <>
      <h2>{books.length} Books Available</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Title</th>
              <th className="text-center">Added_at</th>
              <th className="text-center">BookStatus</th>
              <th className="text-center">price</th>
              <th className="text-center">Edit</th>
              <th className="text-center">Delete</th>
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
              books.map((book, idx) => {
                return (
                  <tr key={book._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{book.title}</td>
                    <td className="text-center">{book.added_at}</td>
                    <td className="text-center">{book.bookStatus}</td>
                    <td className="text-center">{book.mrp_price}</td>
                    <td className="text-center">
                      {" "}
                      <button
                        onClick={() => handleShowModal(book)}
                        className="btn btn-primary"
                      >
                        <FaEdit />
                      </button>{" "}
                    </td>
                    <td className="text-center">
                      {" "}
                      <button
                        onClick={() => handleDelete(book)}
                        className="btn btn-primary"
                      >
                        Delete
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
              <form onSubmit={handleSubmit(handleEditBook)}>
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
                    <option>published</option>
                    <option>unpublished</option>
                  </select>

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

export default ManageBooks;
