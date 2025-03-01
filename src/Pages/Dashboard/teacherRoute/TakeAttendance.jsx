import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const TakeAttendance = () => {
  const [students, setStudents] = useState(null);

  console.log(students);
  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const { data } = await axiosSecure("/api/student");
      setStudents(data.data); // Set students once data is fetched
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  return <div>take attendance</div>;
};

export default TakeAttendance;
