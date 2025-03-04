import { Button, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const TakeAttendance = () => {
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(classes);

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
            id: student.id,
            name: userResponse.data.data.name || "Unknown",
            classId: student.class_id,
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

  // Handle submit
  const handleSubmit = () => {
    console.log(JSON.stringify(students, null, 2)); // Log JSON data
  };

  // const dataSource = [
  //   {
  //     key: "1",
  //     name: "Mike",
  //     age: 32,
  //     address: "10 Downing Street",
  //   },
  //   {
  //     key: "2",
  //     name: "John",
  //     age: 42,
  //     address: "10 Downing Street",
  //   },
  // ];

  const columns = [
    {
      title: "Student Id",
      dataIndex: "studentID",
      key: "studentId",
    },
    {
      title: "Student Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Class name",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Attendance",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select
          value={record.status}
          onChange={(value) => handleStatusChange(record.id, value)}
          style={{ width: 120 }}
        >
          <Select.Option value="PRESENT">Present</Select.Option>
          <Select.Option value="ABSENT">Absent</Select.Option>
          <Select.Option value="LATE">Late</Select.Option>
        </Select>
      ),
    },
  ];

  if (!students || !classes || loading) {
    return <h2>Waiting</h2>;
  }

  return (
    <div>
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
