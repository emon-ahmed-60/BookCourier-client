import React from "react";
import UseAxios from "../Hooks/UseAxios";
import { useQuery } from "@tanstack/react-query";
import { IoPersonAddSharp, IoPersonRemove } from "react-icons/io5";
import Swal from "sweetalert2";

const ApproveLibrarian = () => {
  const instance = UseAxios();

  const {
    data: librarians = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["librarians", "pending"],
    queryFn: async () => {
      const res = await instance.get("/librarians");
      return res.data;
    },
  });

  const updateLibrarianStatus = (librarian, status) => {
    const updateLibrarian = { status: status, email: librarian.contactEmail };
    instance.patch(`/librarian/${librarian._id}`, updateLibrarian).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: status,
          text: `Your status sent to ${status}.`,
          icon: "success",
        });
      }
    });
  };

  const handleAddLibrarian = (librarian) => {
    updateLibrarianStatus(librarian, "approve");
  };

  const handleremoveLibrarian = (librarian) => {
    updateLibrarianStatus(librarian, "rejected");
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th className="text-center">libraryName</th>
            <th className="text-center">city</th>
            <th className="text-center">Order status</th>
            <th className="text-center">librarian status</th>
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
            librarians.map((librarian, idx) => {
              return (
                <tr key={librarian._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className="text-center">{librarian.libraryName}</td>
                  <td className="text-center">{librarian.city}</td>
                  <td className="text-center">{librarian.contactEmail}</td>
                  <td className="text-center">
                    <p
                      className={`${
                        librarian.status === "approve"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {librarian.status}
                    </p>
                  </td>
                  <td className="flex flex-wrap md:flex-nowrap gap-2 justify-center">
                    <button
                      onClick={() => handleAddLibrarian(librarian)}
                      className="btn btn-primary text-xl"
                    >
                      <IoPersonAddSharp />
                    </button>

                    <button
                      onClick={() => handleremoveLibrarian(librarian)}
                      className="btn btn-primary text-xl"
                    >
                      {" "}
                      <IoPersonRemove />
                    </button>
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

export default ApproveLibrarian;
