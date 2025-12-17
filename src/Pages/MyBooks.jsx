import React, { useRef, useState } from "react";
import useAuth from "../Hooks/UseAuth";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const MyBooks = () => {
  const { user } = useAuth();
  const instance = UseAxios();
  const bookRef = useRef(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const { register, handleSubmit } = useForm();
  const {
    data: myBooks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-books", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/my-books?email=${user?.email}`);
      return res.data;
    },
  });

  const handleShowModal = (book) => {
    setSelectedBook(book);
    bookRef.current.showModal();
  };
  const handleEditBook = (data) => {
    const update = data;
    instance.patch(`/book/${selectedBook._id}`, update).then((res) => {
      if (res.data.modifiedCount) {
        toast.success(`Book is ${update.bookStatus} successfully`);
        refetch()
        bookRef.current.close();
      }
    });
  };
  return (
    <>
      <h2>All of my orders {myBooks.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th className="text-center">Title</th>
              <th className="text-center">Added_at</th>
              <th className="text-center">Author</th>
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
              myBooks.map((myBook, idx) => {
                return (
                  <tr key={myBook._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{myBook.title}</td>
                    <td className="text-center">{myBook.added_at}</td>
                    <td className="text-center">{myBook.author}</td>
                    <td className="text-center">{myBook.bookStatus}</td>
                    <td className="text-center">{myBook.mrp_price}</td>
                    <td className="text-center">
                      {" "}
                      <button
                        onClick={() => handleShowModal(myBook)}
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog ref={bookRef} className="modal">
        <div className="modal-box">
          <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-8">
            <div className="card-body">
              <h1 className="font-bold text-2xl text-center text-base-content">
                Change Book Status
              </h1>
              <form onSubmit={handleSubmit(handleEditBook)}>
                <fieldset className="fieldset">
                  {/* Name field */}
                  <label className="label">Book Name</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Book Name"
                    defaultValue={selectedBook?.title}
                    readOnly
                  />

                  {/* Photo URL field  */}
                  <label className="label">Book Image URL</label>

                  <input
                    type="text"
                    className="input"
                    placeholder="Book Image URL"
                    defaultValue={selectedBook?.image_url}
                    readOnly
                  />

                  {/* Book Author  */}
                  <label className="label">Book Author</label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Book author"
                    defaultValue={selectedBook?.author}
                    readOnly
                  />

                  {/* Book Status  */}
                  <label className="label">Book Status</label>
                  <select
                    {...register("bookStatus")}
                    defaultValue="Pick book status"
                    className="select"
                  >
                    <option>published</option>
                    <option>unpublished</option>
                  </select>

                  {/* Price field  */}
                  <label className="label">Book Price</label>
                  <input
                    type="number"
                    className="input"
                    placeholder="Book Price"
                    defaultValue={selectedBook?.mrp_price}
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

export default MyBooks;
