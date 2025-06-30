import { Modal, Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../LoadingPage/LoadingPage";

function PaymentList() {
  const [paymentsList, setPaymentsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { email } = user || {};

  console.log(paymentsList);
  useEffect(() => {
    if (email) {
      fetchPaymentList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const fetchPaymentList = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get(`/api/payment/${email}`);
      setPaymentsList(data.data);
    } catch (error) {
      console.error("Error fetching payment list:", error);
    } finally {
      setLoading(false);
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

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      <h2 className="text-xl font-semibold mt-3">Select the date range</h2>
      <Table
        dataSource={paymentsList}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        bordered
        onRow={(record) => {
          return {
            onClick: () => {
              setSelectedPayment(record);
              setIsModalOpen(true);
            },
          };
        }}
      />
      <Modal
        title="Payment Details"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedPayment(null);
        }}
        footer={null}
      >
        {selectedPayment && (
          <div>
            <p>
              <strong>Transaction ID:</strong> {selectedPayment.transactionId}
            </p>
            <p>
              <strong>Amount:</strong> ৳
              {selectedPayment.amount.toLocaleString()}
            </p>
            <p>
              <strong>Payment Date:</strong>{" "}
              {dayjs(selectedPayment.paymentDate).format("YYYY-MM-DD HH:mm")}
            </p>
            <p>
              <strong>Status:</strong> {selectedPayment.status}
            </p>
            <p>
              <strong>Method:</strong> {selectedPayment.method}
            </p>
            <p>
              <strong>Month:</strong> {selectedPayment.month}
            </p>
            <p>
              <strong>Year:</strong> {selectedPayment.year}
            </p>
            <p>
              <strong>Payment by</strong> {selectedPayment.user_email || "N/A"}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}

export default PaymentList;
