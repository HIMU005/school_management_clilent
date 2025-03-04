import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const { email } = user;

  const [userInfo, setUserInfo] = useState(null);
  const [roleInfo, setRoleInfo] = useState(null);
  console.log(roleInfo);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      fetchRoleInfo();
    }
  }, [userInfo]);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosSecure(`/api/user/${email}`);
      setUserInfo(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleInfo = async () => {
    try {
      // const {data} = await axiosSecure(`/api/`)
      console.log(userInfo);
      if (userInfo.role === "STUDENT") {
        const { data } = await axiosSecure(
          `/api/student/user_id/${userInfo.id}`
        );
        console.log(data);
        setRoleInfo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <div>profile</div>;
};

export default Profile;
