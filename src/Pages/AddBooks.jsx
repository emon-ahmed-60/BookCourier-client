import React from "react";
import UseAxios from "../Hooks/UseAxios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../Hooks/UseAuth";

const AddBooks = () => {
  const instance = UseAxios();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const handleAddBook = (data) => {
    data.added_at = new Date();
    data.email = user?.email;
    instance.post("/books", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Your Book Is Added");
        reset();
      }
    });
  };
  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl mt-8">
      <div className="card-body">
        <h1 className="font-bold text-2xl text-center text-base-content">
          Add New Book
        </h1>
        <form onSubmit={handleSubmit(handleAddBook)}>
          <fieldset className="fieldset">
            {/* Name field */}
            <label className="label">Book Name</label>
            <input
              type="text"
              className="input"
              placeholder="Book Name"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500">Please Add Book Name</p>
            )}
            {/* Photo URL field  */}
            <label className="label">Book Image URL</label>

            <input
              type="text"
              className="input"
              placeholder="Book Image URL"
              {...register("image_url", { required: true })}
            />
            {errors.image_url && (
              <p className="text-red-500">Add Book Image URL</p>
            )}
            {/* Book Author  */}
            <label className="label">Book Author</label>
            <input
              type="text"
              className="input"
              placeholder="Book author"
              {...register("author", { required: true })}
            />
            {errors.author && (
              <p className="text-red-500">Add Book author Name</p>
            )}
            {/* Book Status  */}
            <label className="label">Book Status</label>
            <select
              {...register("bookStatus", { required: true })}
              defaultValue="Pick book status"
              className="select"
            >
              <option>published</option>
              <option>unpublished</option>
            </select>
            {errors.bookStatus && (
              <p className="text-red-500">Select Book Status</p>
            )}
            {/* Price field  */}
            <label className="label">Book Price</label>
            <input
              type="number"
              className="input"
              placeholder="Book Price"
              {...register("mrp_price", { required: true })}
            />
            {errors.mrp_price && <p className="text-red-500">Add Book Price</p>}
            <button type="submit" className="btn btn-neutral mt-4">
              Add Book
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddBooks;
