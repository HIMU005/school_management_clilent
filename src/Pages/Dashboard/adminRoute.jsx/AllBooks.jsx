import { Image, Table } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../LoadingPage/LoadingPage";

function AllBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();

    // cleanup
    return () => {
      setBooks([]);
    };
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/admin/get-books");
      if (data.status === 200) {
        setBooks(data.data);
      } else {
        toast.error("Failed to fetch books");
      }
    } catch (error) {
      toast.error("Failed to fetch books ", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  const columns = [
    {
      title: "Book ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="text-gray-500">{text}</span>,
    },
    {
      title: "Book Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span className="font-semibold">{text}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (
        <span className="text-gray-600">
          {text.length > 50 ? text.slice(0, 50) + "..." : text}
        </span>
      ),
    },
    {
      title: "Assign teacher",
      dataIndex: "teacher.user.name",
      key: "teacher",
      render: (text, record) => (
        <div className="flex items-center gap-2">
          <Image
            width={24}
            src={record.teacher?.user?.photoURL}
            alt={record.teacher?.user?.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span>{record.teacher.user.name}</span>
        </div>
      ),
    },
  ];
  return (
    <>
      <h2 className="text-xl font-semibold mb-2">All books</h2>
      <Table
        dataSource={books}
        columns={columns}
        rowKey={(record) => record.id}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}

export default AllBooks;
