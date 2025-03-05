import { Image } from "antd";
import { useEffect, useState } from "react";
import InformationAsInput from "../../../components/dashboard/showInformation/InformationAsInput";
import ShowStudentInformation from "../../../components/dashboard/showInformation/ShowStudentInformation";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const Profile = () => {
  const { user } = useAuth();
  const { email } = user;

  const [userInfo, setUserInfo] = useState(null);
  const [roleInfo, setRoleInfo] = useState(null);

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
      if (userInfo.role === "STUDENT") {
        const { data } = await axiosSecure(
          `/api/student/user_id/${userInfo.id}`
        );
        setRoleInfo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full">
      {/* left part  */}
      <div className="border border-red-500 w-full space-y-2 p-2 ">
        <div className="flex flex-col md:flex-row md:justify-between gap-1 ">
          <Image width={100} src={userInfo?.photoURL} />
          <div className="">
            {/* Name  */}
            <InformationAsInput
              userInfoValue={userInfo?.name}
              labelTitle={"Name"}
            />

            {/* Email  */}
            <InformationAsInput
              userInfoValue={userInfo?.email}
              labelTitle={"Email"}
            />

            {/* phone  */}
            <InformationAsInput
              userInfoValue={userInfo?.phone}
              labelTitle={"Phone"}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between gap-0 ">
          <div>
            {/* dob  */}
            <InformationAsInput
              userInfoValue={userInfo?.dob}
              labelTitle={"DOB"}
            />
            {/* Age  */}
            <InformationAsInput
              userInfoValue={userInfo?.age}
              labelTitle={"Age"}
            />
          </div>
          <div>
            {/* gender  */}
            <InformationAsInput
              userInfoValue={userInfo?.gender}
              labelTitle={"Gender"}
            />
            {/* dob  */}
            <InformationAsInput
              userInfoValue={userInfo?.role}
              labelTitle={"Role: "}
            />
          </div>
        </div>
      </div>

      {/* right part  */}
      <div className="border border-blue-500 w-full h-auto p-2 ">
        {userInfo?.role === "STUDENT" && (
          <ShowStudentInformation roleInfo={roleInfo} />
        )}
      </div>
    </div>
  );
};

export default Profile;
