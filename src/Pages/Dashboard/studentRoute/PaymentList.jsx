import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

function PaymentList() {
  const [paymentsList, setPaymentsList] = useState([]);
  const { user } = useAuth();
  const { email } = user || {};

  useEffect(() => {
    if (email) {
      fetchPaymentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const fetchPaymentList = async () => {
    try {
      // Assuming axiosSecure is defined and configured
      const { data } = await axiosSecure.get(`/api/payment/${email}`);
      setPaymentsList(data.data);
    } catch (error) {
      console.error("Error fetching payment list:", error);
    }
  };
  const columns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Amount (BDT)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => amount.toLocaleString(), // format number with commas
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (date) => dayjs(date).format("YYYY-MM-DD HH:mm"), // formatted date
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filter: [
        { text: "PAID", value: "PAID" },
        { text: "PENDING", value: "PENDING" },
        { text: "FAILED", value: "FAILED" },
        { text: "CANCELED", value: "CANCELED" },
        { text: "UNPAID", value: "UNPAID" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color;
        switch (status) {
          case "PAID":
            color = "green";
            break;
          case "PENDING":
            color = "orange";
            break;
          case "FAILED":
            color = "red";
            break;
          case "UNPAID":
            color = "gray";
            break;
          case "CANCELED":
            color = "purple";
            break;
          default:
            color = "blue";
        }
        return (
          <Tag
            color={color}
            style={{ padding: "4px 10px", borderRadius: "6px" }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Month",
      dataIndex: "month",
      key: "month",
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
  ];

  return (
    <>
      <h2 className="text-xl font-semibold mt-3">Select the date range</h2>
      <Table
        dataSource={paymentsList}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
      />
    </>
  );
}

export default PaymentList;
