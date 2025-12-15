import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/UseAuth";
import UseAxios from "../Hooks/UseAxios";
import Swal from "sweetalert2";

const MyOrders = () => {
  const { user, loading } = useAuth();
  const instance = UseAxios();

  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-dots loading-xl mx-auto"></span>
      </div>
    );
  }

  const {
    data: myOrders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/bookorders?email=${user?.email}`);
      return res.data;
    },
  });
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to cancel your order ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/bookorders/${id}`).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "Cancelled!",
              text: "Your order has been cancelled.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handlePayment = async (data) => {
    const paymentInfo = {
      orderId: data._id,
      bookTitle: data.title,
      email: data.email,
      phone: data.phone,
      address: data.address,
      amount: data.price,
      paymentStatus: data.paymentStatus,
      date: data.date,
      status: data.status,
    };

    const res = await instance.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };
  return (
    <>
      <h2>All of my orders {myOrders.length}</h2>
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
            {isLoading ? (
              <tr className="text-center">
                <td>
                  <span className="loading loading-dots loading-xl"></span>
                </td>
              </tr>
            ) : (
              myOrders.map((parcel, idx) => {
                return (
                  <tr key={parcel._id}>
                    <td className="text-center">{idx + 1}</td>
                    <td className="text-center">{parcel.title}</td>
                    <td className="text-center">{parcel.date}</td>
                    <td className="text-center">{parcel.status}</td>
                    <td className="text-center">{parcel.paymentStatus}</td>

                    {parcel.status === "pending" && (
                      <td className="flex flex-wrap md:flex-nowrap gap-2 justify-center">
                        <button
                          onClick={() => handleDelete(parcel._id)}
                          className="flex-1/2 btn btn-square text-white w-full btn-primary"
                        >
                          cancel order
                        </button>
                        {parcel.paymentStatus !== "paid" && (
                          <button
                            onClick={() => handlePayment(parcel)}
                            className="flex-1/2 btn w-full btn-square text-white bg-primary"
                          >
                            {" "}
                            Pay Now
                          </button>
                        )}
                      </td>
                    )}
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

export default MyOrders;
