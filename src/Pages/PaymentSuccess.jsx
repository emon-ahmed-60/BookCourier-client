import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import UseAxios from "../Hooks/UseAxios";

const PaymentSuccess = () => {
  const instance = UseAxios();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      instance
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {});
    }
  }, [sessionId, instance]);
  return (
    <div className="my-auto text-center space-y-4">
      <h1 className="text-4xl text-center">Payment Successfull</h1>
      <Link to="/dashboard/my-orders" className="btn btn-primary">
        Go My Orders
      </Link>
    </div>
  );
};

export default PaymentSuccess;
