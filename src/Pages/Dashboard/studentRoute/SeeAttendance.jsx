import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AttendanceTable from "../../../components/dashboard/shared/attendenceTable/AttendanceTable";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
const { RangePicker } = DatePicker;
function SeeAttendance() {
  const { user } = useAuth();
  const [studentsAttendance, setStudentsAttendance] = useState([]);
  const [dateRange, setDateRange] = useState([
    dayjs().subtract(1, "month").startOf("day"),
    dayjs().endOf("day"),
  ]);

  const handleDateChange = (dates) => {
    setDateRange([dates[0].startOf("day"), dates[1].endOf("day")]);
  };

  //   fetch here
  const filterAttendanceByDate = async () => {
    if (!dateRange[0] || !dateRange[1]) return;

    const startDate = dateRange[0].format("YYYY-MM-DD HH:mm:ss");
    const endDate = dateRange[1].format("YYYY-MM-DD HH:mm:ss");
    try {
      const { data } = await axiosSecure.get(
        "/api/filter/see_attendance_by_date",
        { params: { startDate, endDate, email: user?.email } }
      );
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
    } catch (error) {
      toast.error("Error filtering attendance by date:", error);
    }
  };

  useEffect(() => {
    filterAttendanceByDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  return (
    <>
      <h2 className="text-xl font-semibold mt-3">Select the date range</h2>
      <RangePicker
        picker="date"
        format="YYYY-MM-DD"
        onChange={handleDateChange}
        value={dateRange}
      />
      <AttendanceTable studentsAttendance={studentsAttendance} />
    </>
  );
}

export default SeeAttendance;
