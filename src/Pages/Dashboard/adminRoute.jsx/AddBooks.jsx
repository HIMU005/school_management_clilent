import { Button, Dropdown, Form, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../LoadingPage/LoadingPage";

function AddBooks() {
  const [form] = Form.useForm();
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [subjectDetails, setSubjectDetails] = useState({
    name: "",
    description: "",
    teacherId: null,
  });

  useEffect(() => {
    fetchTeacher();

    // cleanup
    return () => {
      setTeacher(null);
    };
  }, []);
  // /api/teacher
  const fetchTeacher = async () => {
    try {
      setLoading(true);
      const { data } = await axiosSecure.get("/api/teacher");
      setTeacher(data.data);
    } catch (error) {
      console.error("Error fetching teacher data:", error);
    } finally {
      setLoading(false);
    }
  };

  const items = teacher
    ? teacher.map((teacher) => {
        return {
          key: teacher.id,
          label: (
            <div className="flex items-center gap-2">
              <img
                src={teacher.user.photoURL}
                alt={teacher.user.name}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span>{teacher.user.name}</span>
            </div>
          ),
        };
      })
    : [];
  const menuProps = {
    items,
    onClick: ({ key }) => {
      setSubjectDetails({
        ...subjectDetails,
        teacherId: parseInt(key),
      });
    },
  };

  const selectedTeacher = teacher?.find(
    (t) => t.id === parseInt(subjectDetails.teacherId)
  );

  const handleAdd = async (values) => {
    if (subjectDetails.name === "") {
      return toast.error("Subject name is required");
    }
    if (subjectDetails.description === "") {
      return toast.error("Description is required");
    }
    if (!subjectDetails.teacherId) {
      return toast.error("Please select the assigned teacher");
    }

    const payload = {
      name: values.subjectName,
      description: values.description,
      teacherId: subjectDetails.teacherId,
    };

    try {
      setLoading(true);
      const { data } = await axiosSecure.post("/api/admin/add-book", payload);
      if (data.status === 201) {
        toast.success("Subject added successfully");
        navigate("/dashboard/all-subjects");
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      toast.error("Failed to add subject");
    } finally {
      setLoading(false);
      form.resetFields();
      setSubjectDetails({
        name: "",
        description: "",
        teacherId: null,
      });
    }
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="pr-10">
      <h2 className="text-xl font-semibold mb-2">Add books</h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleAdd}
        initialValues={{ subjectName: "", description: "" }}
      >
        <Form.Item
          label="Subject Name"
          name="subjectName"
          rules={[
            { required: true, message: "Please input the subject name!" },
          ]}
        >
          <Input
            placeholder="subject Name"
            size="large"
            required
            value={subjectDetails.name}
            onChange={(e) =>
              setSubjectDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <TextArea
            rows={4}
            maxLength={200}
            placeholder="Write subject description"
            value={subjectDetails.description}
            onChange={(e) =>
              setSubjectDetails((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
          />
        </Form.Item>

        <Form.Item
          label="Teacher"
          required
          validateStatus={!subjectDetails.teacherId ? "error" : ""}
          help={!subjectDetails.teacherId && "Please select a teacher"}
        >
          {" "}
          <Dropdown size="large" required menu={menuProps}>
            <Button>
              <Space>
                {selectedTeacher ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedTeacher.user.photoURL}
                      alt={selectedTeacher.user.name}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>{selectedTeacher.user.name}</span>
                  </div>
                ) : (
                  "Select Teacher"
                )}
              </Space>
            </Button>
          </Dropdown>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            className="mt-4"
            htmlType="submit"
            size="large"
          >
            Add Book
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddBooks;
