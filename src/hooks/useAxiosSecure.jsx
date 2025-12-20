import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";
const axiosSecure = axios.create({ baseURL: "http://localhost:3000" });
const useAxiosSecure = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    // request interceptor runs before request of axiosSecure each time
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${user?.accessToken}`;
      return config;
    });

    // response interceptor runs after each response of axiosSecure
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.status;
        if (statusCode === 401 || statusCode === 403) {
          logoutUser().then(() => {
            navigate("/login");
          });
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [user, logoutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
