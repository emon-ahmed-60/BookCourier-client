import React from "react";
import useAuth from "./UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxios from "./UseAxios";

const UseRole = () => {
  const { user } = useAuth();
  const instance = UseAxios();
  const { data: role = "user", isLoading } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await instance.get(`/users/${user?.email}/role`);
      return res.data;
    },
  });
  return { isLoading, role };
};

export default UseRole;
