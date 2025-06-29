import { Table } from "antd";

// eslint-disable-next-line react/prop-types
function AttendanceTable({ studentsAttendance }) {
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (url) => (
        <img
          src={url}
          alt="Student"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Session",
      dataIndex: "session",
      key: "session",
    },
    {
      title: "Class",
      dataIndex: "className",
      key: "className",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const colors = {
          PRESENT: "green",
          ABSENT: "red",
          LATE: "blue",
        };
        return (
          <span style={{ color: colors[status] || "gray", fontWeight: 500 }}>
            {status}
          </span>
        );
      },
    },
    {
      title: "Date & Time",
      dataIndex: "time",
      key: "time",
    },
  ];

  //   console.log(studentsAttendance);
  return (
    <Table
      columns={columns}
      dataSource={studentsAttendance}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10 }}
    />
  );
}

export default AttendanceTable;
