import React, { useRef } from "react";
import { useParams } from "react-router";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const BookDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, loading } = useAuth();

  const bookRef = useRef(null);
  const instance = UseAxios();
  const { id } = useParams();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book-details", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/books/${id}`);
      return res.data;
    },
  });

  if (loading) {
    return <div className="text-center"><span className="loading loading-dots loading-xl"></span></div>;
  } else if (isLoading) {
    return <div className="text-center"><span className="loading loading-dots loading-xl"></span></div>;
  }

  const {
    rental_rate_per_day,
    library_id,
    title,
    author,
    description,
    stock_count,
    image_url,
    added_at,
    mrp_price,
  } = book || {};

  const handleOrderNow = () => {
    bookRef.current.showModal();
  };

  const handleAddOrder = (data) => {
    data.paymentStatus = "unpaid";
    data.status = "pending";
    data.date = new Date();
    data.price = mrp_price
    instance.post("/bookorders", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Order placed successfully");
      }
    });
    bookRef.current.close();
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-5 bg-base-100 shadow-sm">
        <figure className="mx-auto">
          <img src={image_url} alt="Book Image" />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-2xl">{title}</h2>
          <p className="text-base-content font-semibold">{description}</p>
          <p className="text-base-content font-semibold">
            library_id : {library_id}
          </p>
          <p className="text-base-content font-semibold">
            added_at : {added_at}
          </p>
          <p className="text-base-content font-semibold">author : {author}</p>
          <p className="text-base-content font-semibold">
            mrp_price : {mrp_price}
          </p>
          <p className="text-base-content font-semibold">
            rental_rate_per_day : ${rental_rate_per_day}
          </p>
          <p className="text-base-content font-semibold">
            stock_count : {stock_count}
          </p>
          <button onClick={handleOrderNow} className="btn btn-primary">
            ORDER NOW
          </button>
        </div>

        <dialog
          id="my_modal_5"
          ref={bookRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <h1 className="font-bold text-3xl text-base-content text-center mt-4">
                  Add Booking
                </h1>
                <form onSubmit={handleSubmit(handleAddOrder)}>
                  <fieldset className="fieldset">
                    <label className="label">Book Name</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Book name"
                      {...register("title")}
                      readOnly
                      defaultValue={title}
                    />

                    <label className="label">Your Email</label>
                    <input
                      type="email"
                      className="input"
                      placeholder="Your email"
                      {...register("email")}
                      readOnly
                      defaultValue={user?.email}
                    />

                    <label className="label">Phone Number</label>
                    <input
                      type="number"
                      className="input"
                      placeholder="Your phone number"
                      {...register("phone", { required: true, minLength: 11 })}
                    />
                    {errors.phone && (
                      <span className="text-red-500">
                        This field is required and must be at least 11 digits
                      </span>
                    )}
                    <label className="label">Address</label>
                    <input
                      type="text"
                      className="input"
                      placeholder="Your Address"
                      {...register("address", { required: true })}
                    />

                    <button className="btn btn-neutral mt-4">
                      Place Order
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      {/* <h1 className="font-bold text-3xl text-base-content text-center my-8">
        Customer Reviews For This Service
      </h1>
      {reviews.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review) => {
            return (
              <div
                key={review._id}
                className="card bg-base-100 card-xs shadow-sm p-4 flex items-center ga-4"
              >
                <div className="flex items-center gap-4 justify-start w-full">
                  <figure>
                    {user.photoURL ? (
                      <img
                        src={review.photo}
                        alt=""
                        className="w-12 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 rounded-full" />
                    )}
                  </figure>
                  <h2 className="card-title text-xl">{review.name}</h2>
                </div>
                <div className="card-body w-full my-2">
                  <p className="font-semibold text-base-content">
                    {review.review}
                  </p>
                  <div className="flex items-center justify-end gap-2">
                    {review.rating == 5 ? (
                      <p className="text-right">⭐⭐⭐⭐⭐</p>
                    ) : review.rating == 4 ? (
                      <p className="text-right">⭐⭐⭐⭐</p>
                    ) : review.rating == 3 ? (
                      <p className="text-right">⭐⭐⭐</p>
                    ) : review.rating == 2 ? (
                      <p className="text-right">⭐⭐</p>
                    ) : review.rating == 1 ? (
                      <p className="text-right">⭐</p>
                    ) : (
                      <p className="text-right">No rating</p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <h1 className="font-bold text-3xl text-base-content text-center my-8">
          No Reviews In This Service
        </h1>
      )} */}
    </>
  );
};

export default BookDetails;
