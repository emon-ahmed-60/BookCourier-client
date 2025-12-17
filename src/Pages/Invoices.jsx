import React from "react";
import UseAxios from "../Hooks/UseAxios";
import useAuth from "../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";

const Invoices = () => {
  const instance = UseAxios();
  const { user } = useAuth();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["my-payments", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/payments?email=${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Book Name</th>
            <th className="text-center">Paid At</th>
            <th className="text-center">Payment ID</th>
            <th className="text-center">Amount</th>
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
            payments.map((payment, idx) => {
              return (
                <tr key={payment._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-center">{payment.bookName}</td>
                  <td className="text-center">{payment.paidAt}</td>
                  <td className="text-center">{payment.trackingId}</td>
                  <td className="text-center">{payment.amount}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Invoices;
