import React from "react";
import useAuth from "../Hooks/UseAuth";
import UseRole from "../Hooks/UseRole";

const AdminRote = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = UseRole();

  if (loading || isLoading) {
    return (
      <div className="flex justify-center w-full py-4">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }
  if (role.role !== "admin") {
    return (
      <h1 className="text-2xl font-bold text-center mt-8">Only Admin Access</h1>
    );
  }

  return children;
};

export default AdminRote;
