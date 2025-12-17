import React, { useRef } from "react";
import { useParams } from "react-router";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaUserCircle } from "react-icons/fa";

const BookDetails = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { register: registerReview, handleSubmit: registerHandleSubmit } =
    useForm();

  const { user, loading } = useAuth();

  const bookRef = useRef(null);
  const reviewRef = useRef(null);
  const instance = UseAxios();
  const { id } = useParams();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book-details", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/books/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["book-reviews", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/reviews/${id}`);
      return res.data;
    },
  });

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );
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

  const handleAddReview = (data) => {
    data.photo = user?.photoURL;
    data.reviewId = id;
    instance.post("/review", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Thanks for review");
        refetch();
        reviewRef.current.close();
      }
    });
  };

  const handleAddOrder = (data) => {
    data.paymentStatus = "unpaid";
    data.status = "pending";
    data.date = new Date();
    data.price = mrp_price;
    instance.post("/bookorders", data).then((res) => {
      if (res.data.insertedId) {
        toast.success("Order placed successfully");
        bookRef.current.close();
        reviewRef.current.showModal();
      }
    });
  };

  const handleWishlist = () => {
    instance.post(`/wishlist?email=${user?.email}`, book).then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "This Book Add Your Wishlists Page",
        showConfirmButton: false,
        timer: 1500,
      });
    });
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
          <button onClick={handleWishlist} className="btn btn-neutral">
            Add Wishlist
          </button>
        </div>

        <dialog ref={reviewRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
              <div className="card-body">
                <h1 className="font-bold text-3xl text-base-content text-center mt-4">
                  Please Review This Book
                </h1>
                <form onSubmit={registerHandleSubmit(handleAddReview)}>
                  <fieldset className="fieldset">
                    <label className="label">Your Name</label>
                    <input
                      type="text"
                      className="input"
                      defaultValue={user?.displayName}
                      {...registerReview("displayName", { required: true })}
                    />
                    <label className="font-semibold text-lg">
                      select rating
                    </label>
                    <select className="select" {...registerReview("rating")}>
                      <option value="5">⭐⭐⭐⭐⭐</option>
                      <option value="4">⭐⭐⭐⭐</option>
                      <option value="3">⭐⭐⭐</option>
                      <option value="2">⭐⭐</option>
                      <option value="1">⭐</option>
                    </select>
                    <textarea
                      className="textarea"
                      placeholder="Write your review..."
                      {...registerReview("reviewBox", { required: true })}
                    ></textarea>
                    <button className="btn btn-neutral mt-4">Add Review</button>
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

        <dialog ref={bookRef} className="modal modal-bottom sm:modal-middle">
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
      <h1 className="font-bold text-3xl text-base-content text-center my-8">
        Users Reviews For This Book
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
                    {review.photo ? (
                      <img
                        src={review.photo}
                        alt="photo"
                        className="w-12 rounded-full"
                      />
                    ) : (
                      <FaUserCircle className="w-12 h-12 rounded-full" />
                    )}
                  </figure>
                  <h2 className="card-title text-xl">{review.displayName}</h2>
                </div>
                <div className="card-body w-full my-2">
                  <p className="font-semibold text-base-content">
                    {review.reviewBox}
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
          No Reviews In This Book
        </h1>
      )}
    </>
  );
};

export default BookDetails;
