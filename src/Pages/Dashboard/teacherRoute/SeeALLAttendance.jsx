import { useEffect, useState } from "react";
import AttendanceTable from "../../../components/dashboard/shared/attendenceTable/AttendanceTable";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

function SeeALLAttendance() {
  const [filterItem, setFilterItem] = useState({
    class: "",
  });
  const [classes, setClasses] = useState([]);
  const [studentsAttendance, setStudentsAttendance] = useState([]);

  useEffect(() => {
    // if (filterItem.class !== "") {
    fetchStudentsAttendance();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterItem.class]);

  useEffect(() => {
    fetchClasses();
  }, []);

  // selected class
  const handleChange = (event) => {
    if (event.target.value) {
      const classID = parseInt(event.target.value);
      setFilterItem({ ...filterItem, class: classID });
      return;
    }
    setFilterItem({ ...filterItem, class: "" });
  };
  const fetchStudentsAttendance = async () => {
    const { data } = await axiosSecure.get("/api/filter/see_attendance", {
      params: {
        selectedClass: filterItem.class,
      },
    });
    console.log(data.data[0]);
    const flattened = data.data.map((item) => ({
      id: item.id,
      photo: item.student?.user?.photoURL,
      name: item.student?.user?.name,
      email: item.student?.user?.email,
      session: item.student?.session,
      className: item.class?.name,
      status: item.status,
      time: new Date(item.takingTime).toLocaleString(),
    }));
    setStudentsAttendance(flattened);
  };

  const fetchClasses = async () => {
    try {
      const { data } = await axiosSecure("/api/class");
      setClasses(data.data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mt-3">Select class</h2>
      <select
        className="block w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
        value={filterItem.class || ""}
        onChange={handleChange}
      >
        <option value="">Select a class</option>
        {classes?.map((classItem) => (
          <option key={classItem?.id} value={classItem?.id}>
            {classItem?.name}
          </option>
        ))}
      </select>

      <AttendanceTable studentsAttendance={studentsAttendance} />
    </>
  );
}

export default SeeALLAttendance;
