import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./UseAuth";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: "https://book-courier-server-phi.vercel.app",
});

const UseAxios = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken || user?.idToken;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    const resuestInterceptor = instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        const statusCode = err.status;
        if (statusCode === 401 || statusCode === 403) {
          logOut().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(err);
      }
    );

    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(resuestInterceptor);
    };
  }, [user, navigate, logOut]);

  return instance;
};

export default UseAxios;
