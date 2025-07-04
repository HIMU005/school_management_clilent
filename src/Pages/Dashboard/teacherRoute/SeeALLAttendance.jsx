import { Button, Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import AttendanceTable from "../../../components/dashboard/shared/attendenceTable/AttendanceTable";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

function SeeALLAttendance() {
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    // if (filterItem.class !== "") {
    fetchStudentsAttendance();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStudent]);

  useEffect(() => {
    fetchStudents();

    // clean up
    return () => {
      setStudentsAttendance([]);
      setStudents([]);
    };
  }, []);

  const fetchStudentsAttendance = async () => {
    const selectedStudentId = selectedStudent
      ? parseInt(selectedStudent?.id)
      : null;
    console.log(selectedStudentId);
    const { data } = await axiosSecure.get("/api/filter/see_attendance", {
      params: {
        student_id: selectedStudentId,
      },
    });
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

  // fetch students information
  const fetchStudents = async () => {
    try {
      const { data } = await axiosSecure("/api/student");
      setStudents(data.data);
    } catch (error) {
      console.log("Error fetching students info ", error.message);
    }
  };

  // for dropdown
  const studentItems = students.map((student) => ({
    key: student.id,
    label: (
      <div className="flex items-center gap-2">
        <img
          src={student.user.photoURL}
          alt={student.user.name}
          className="w-5 h-5 rounded-full object-cover"
        />
        <span>{student.user.name}</span>
      </div>
    ),
  }));

  // select a student
  const studentMenuProps = {
    items: studentItems,
    onClick: ({ key }) => {
      const found = students.find((s) => s.id === parseInt(key));
      setSelectedStudent(found);
    },
  };

  return (
    <>
      <h2 className="text-xl font-semibold mt-3">Select class</h2>

      <Dropdown menu={studentMenuProps}>
        <Button>
          <Space>
            {selectedStudent ? (
              <div className="flex items-center gap-2">
                <img
                  src={selectedStudent.user.photoURL}
                  alt={selectedStudent.user.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{selectedStudent.user.name}</span>
              </div>
            ) : (
              "Select any student"
            )}
          </Space>
        </Button>
      </Dropdown>

      <AttendanceTable studentsAttendance={studentsAttendance} />
    </>
  );
}

export default SeeALLAttendance;
