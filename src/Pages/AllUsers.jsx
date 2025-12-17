import React from "react";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { FaUserShield } from "react-icons/fa";
import { FiShieldOff } from "react-icons/fi";
import { SiLibrarything } from "react-icons/si";
import { FaUser } from "react-icons/fa";

import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth";

const AllUsers = () => {
  const instance = UseAxios();
  const {user} = useAuth()
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await instance.get("/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    const roleInfo = { role: "admin" };
    Swal.fire({
      title: "Are you sure?",
      text: `You want ${user.displayName} mark as an admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Can",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} mark as an admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };
  const handleMakeLibrarian = (user) => {
    const roleInfo = { role: "librarian" };
    Swal.fire({
      title: "Are you sure?",
      text: `You want ${user.displayName} mark as an librarian`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Can",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} mark as an librarian`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleRemoveLibrarian = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: `You want ${user.displayName} remove as an librarian`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Can",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} remove as an librarian`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };
  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    Swal.fire({
      title: "Are you sure?",
      text: `You want ${user.displayName} remove as an admin`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I Can",
    }).then((result) => {
      if (result.isConfirmed) {
        instance.patch(`/users/${user._id}`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${user.displayName} remove as an admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th className="text-center">Name</th>
            <th className="text-center">email</th>
            <th className="text-center">Role</th>
            <th className="text-center">Admin Actions</th>
            <th className="text-center">Librarian Actions</th>
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
            users.map((user, idx) => {
              return (
                <tr key={user._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-center">{user.displayName}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn bg-red-300"
                      >
                        <FiShieldOff />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-primary"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    {user.role === "librarian" ? (
                      <button
                        onClick={() => handleRemoveLibrarian(user)}
                        className="btn bg-red-300"
                      >
                        <FaUser />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeLibrarian(user)}
                        className="btn btn-primary"
                      >
                        <SiLibrarything />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
