import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

function SeeALLAttendance() {
  const [filterItem, setFilterItem] = useState({
    class: "",
    date: "",
  });
  useEffect(() => {
    fetchStudentsAttendance();
  }, []);

  const fetchStudentsAttendance = async () => {
    const { data } = await axiosSecure.get("/api/filter/see_attendance");
    console.log(data.data);
  };

  return <div></div>;
}

export default SeeALLAttendance;
