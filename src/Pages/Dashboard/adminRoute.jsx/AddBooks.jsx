import { Button, Dropdown, Input, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import LoadingPage from "../../LoadingPage/LoadingPage";

function AddBooks() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(false);
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

  const handleAdd = async () => {
    console.log(subjectDetails);
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="pr-10">
      <h2 className="text-xl font-semibold mb-2">Add books</h2>
      <label className="block mb-2">Subject Name</label>
      <Input
        placeholder="subject Name"
        size="large"
        required
        value={subjectDetails.name}
        onChange={(e) =>
          setSubjectDetails((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <label className="block mb-2">Subject Name</label>
      <TextArea
        rows={4}
        placeholder="maxLength is 6"
        maxLength={6}
        required
        value={subjectDetails.description}
        onChange={(e) =>
          setSubjectDetails((prev) => ({
            ...prev,
            description: e.target.value,
          }))
        }
      />
      <label className="block mb-2">Teacher Name</label>
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

      <Button type="primary" className="mt-4" onClick={handleAdd}>
        Add Book
      </Button>
    </div>
  );
}

export default AddBooks;
