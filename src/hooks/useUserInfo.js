import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: userInfo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["userInfo", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/api/user/${user?.email}`);
      return data?.data;
    },
  });

  if (error) {
    toast.error(error);
  }

  return { userInfo, isLoading, error };
};

export default useUserInfo;
