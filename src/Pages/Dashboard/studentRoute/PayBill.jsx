import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

function PayBill() {
  const { user } = useAuth();
  const [studentInfo, setStudentInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(dayjs());

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  const fetchStudentInfo = async () => {
    try {
      const { data } = await axiosSecure.get(`/api/user/${user?.email}`);
      setStudentInfo(data.data);
    } catch (error) {
      toast.error("Error fetching student info:", error);
    }
  };
  const handleDateChange = (value) => {
    setSelectedMonth(value);
  };

  const payBill = async () => {
    const month = selectedMonth.format("MM");
    const year = selectedMonth.format("YYYY");
    setLoading(true);
    try {
      const { data } = await axiosSecure.post("/api/payment", {
        user: studentInfo,
        month: month,
        year: year,
      });
      if (!data.url) {
        throw new Error("Payment URL not found");
      }
      window.location.replace(data.url);
    } catch (error) {
      toast.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-2">Select Month to Pay Bill</h2>
      <DatePicker
        picker="month"
        value={selectedMonth}
        onChange={handleDateChange}
        renderExtraFooter={() => "Choose your billing month"}
      />
      <br />
      <br />
      <Button
        type="primary"
        loading={loading}
        disabled={loading}
        onClick={payBill}
      >
        Pay Bill for {selectedMonth.format("MMMM YYYY")}
      </Button>
    </>
  );
}

export default PayBill;
