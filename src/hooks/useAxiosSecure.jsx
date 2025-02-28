import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut, setLoading } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("Error tracked in the interrupt ", error.response);
        if (error.response.status === 401 || error.response.status === 403) {
          await logOut;
          setLoading(false);
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, setLoading]);
  return axiosSecure;
};

export default useAxiosSecure;
