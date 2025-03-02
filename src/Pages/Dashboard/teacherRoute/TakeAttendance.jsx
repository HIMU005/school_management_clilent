import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);
  const fetchStudents = async () => {
    try {
      const { data } = await axiosSecure("/api/student");
      setStudents(data.data); // Set students once data is fetched
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };
  const fetchClasses = async () => {
    try {
      const { data } = await axiosSecure("/api/class");
      setClasses(data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  if (!students || !classes) {
    return <h2>Waiting</h2>;
  }
  return <div>take attendance</div>;
};

export default TakeAttendance;
