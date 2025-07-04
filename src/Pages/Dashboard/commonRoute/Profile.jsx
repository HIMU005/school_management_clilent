import { Image } from "antd";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Link } from "react-router";
import { toast } from "react-toastify";
import InformationAsInput from "../../../components/dashboard/showInformation/InformationAsInput";
import ShowStudentInformation from "../../../components/dashboard/showInformation/ShowStudentInformation";
import ShowTeacherInformation from "../../../components/dashboard/showInformation/showTeacherInformation";
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
      toast.error(error);
    }
  };

  const fetchRoleInfo = async () => {
    try {
      // fetch if the user is student
      if (userInfo.role === "STUDENT") {
        const { data } = await axiosSecure(
          `/api/student/user_id/${userInfo.id}`
        );
        setRoleInfo(data.data);
      }
      // fetch if the user is teacher
      if (userInfo.role === "TEACHER") {
        const { data } = await axiosSecure(
          `/api/teacher/user_id/${userInfo.id}`
        );
        setRoleInfo(data.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row  gap-4 w-full mx-auto ">
        {/* left part  */}
        <div className=" space-y-2 p-2 bg-gray-100 rounded-md ">
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

          <div className="flex flex-col md:flex-row md:justify-between gap-8 ">
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
        <div className=" p-2 bg-gray-100 rounded-md ">
          {userInfo?.role === "STUDENT" && (
            <ShowStudentInformation roleInfo={roleInfo} />
          )}

          {userInfo?.role === "TEACHER" && (
            <ShowTeacherInformation roleInfo={roleInfo} />
          )}
        </div>
      </div>

      <Link
        to={"/dashboard/updateProfile"}
        className="btn bg-[#1DD100] text-white "
      >
        <CiEdit className="text-2xl " /> Edit
      </Link>
    </div>
  );
};

export default Profile;
