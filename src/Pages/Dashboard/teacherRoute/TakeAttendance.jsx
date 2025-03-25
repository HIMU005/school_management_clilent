import { Button, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState("");

  // console.log(students);
  // console.log(classes);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
  }, []);

  const fetchStudents = async () => {
    try {
      const { data } = await axiosSecure("/api/student");
      const studentDetails = await Promise.all(
        data.data.map(async (student) => {
          // Fetch the user name for each student
          const userResponse = await axiosSecure(
            `/api/user/user_id/${student.user_id}`
          );
          return {
            id: student?.id,
            name: userResponse.data.data.name || "Unknown",
            classId: student?.class_id,
            status: "ABSENT",
          };
        })
      );
      setStudents(studentDetails);
      setLoading(false); // Set loading to false when done fetching
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false); // Set loading to false in case of an error
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

  // Handle status change
  const handleStatusChange = (studentId, value) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === studentId ? { ...student, status: value } : student
      )
    );
  };

  // selected class
  const handleChange = (event) => {
    if (event.target.value) {
      const classID = parseInt(event.target.value);
      setSelectedClass(classID);
      return;
    }
    setSelectedClass(event.target.value);
  };

  const handleFilterFetch = async () => {
    try {
      const { data } = await axiosSecure(
        `/api/filter/student_for_attendance?selectedClass=${selectedClass}`
      );
      console.log(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // Handle submit
  const handleSubmit = () => {
    console.log(JSON.stringify(students, null, 2)); // Log JSON data
  };

  const statusStyles = {
    PRESENT: { backgroundColor: "#1DD100", color: "white" }, // green-500
    ABSENT: { backgroundColor: "#dc3545", color: "white" }, // red-500
    LATE: { backgroundColor: "#2196F3", color: "white" }, // orange-500
  };

  const columns = [
    {
      title: "Student Id",
      dataIndex: "id",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class name",
      dataIndex: "classId",
      key: "className",
      render: (classId) => {
        const classDetails = classes.find((cls) => cls.id === classId);
        return classDetails ? classDetails.name : "No Class"; // Display class name or "No Class"
      },
    },
    {
      title: "Attendance",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          className="bg-blue-500"
          style={{
            width: 120,
            backgroundColor:
              statusStyles[record.status]?.backgroundColor || "#f5f5f5", // Default to gray if no match
            color: statusStyles[record.status]?.color || "black", // Default to black text if no match
            borderRadius: 5,
            textAlign: "center",
            padding: "3px",
          }}
        >
          <Select.Option value="PRESENT" style={statusStyles.PRESENT}>
            Present
          </Select.Option>
          <Select.Option value="ABSENT" style={statusStyles.ABSENT}>
            Absent
          </Select.Option>
          <Select.Option value="LATE" style={statusStyles.LATE}>
            Late
          </Select.Option>
        </Select>
      ),
    },
  ];

  if (!students || !classes || loading) {
    return <h2>Waiting</h2>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mt-3">Select class</h2>
      <select
        className="block w-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-3"
        value={selectedClass}
        onChange={handleChange}
      >
        <option value="">Select a class</option>
        {classes?.map((classItem) => (
          <option key={classItem?.id} value={classItem?.id}>
            {classItem?.name}
          </option>
        ))}
      </select>

      <button onClick={handleFilterFetch} className="btn btn-outline btn-info">
        Apply
      </button>

      <Table
        rowKey={"id"}
        dataSource={students}
        columns={columns}
        pagination={false}
        bordered
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: 10 }}>
        Submit Attendance
      </Button>
    </div>
  );
};

export default TakeAttendance;
