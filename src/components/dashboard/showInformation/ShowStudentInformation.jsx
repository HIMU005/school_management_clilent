/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import InformationAsInput from "./InformationAsInput";

const ShowStudentInformation = ({ roleInfo }) => {
  const axiosSecure = useAxiosSecure();

  const [classes, setClasses] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, [roleInfo]);

  // fetch all class function
  const fetchClasses = async () => {
    try {
      const { data } = await axiosSecure("/api/class");
      setClasses(data.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const class_Name = classes?.find(
    (classItem) => classItem.id === roleInfo?.class_id
  )?.name;

  return (
    <div>
      {/* student ID  */}
      <InformationAsInput
        userInfoValue={roleInfo?.id}
        labelTitle={"Student Id"}
      />

      {/* Session  */}
      <InformationAsInput
        userInfoValue={roleInfo?.session}
        labelTitle={"session"}
      />
      {/* class  */}
      <InformationAsInput
        // userInfoValue={roleInfo?.class_id}
        userInfoValue={class_Name}
        labelTitle={"Class "}
      />
    </div>
  );
};

export default ShowStudentInformation;
