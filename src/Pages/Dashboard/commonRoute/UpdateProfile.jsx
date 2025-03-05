import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import StudentUpdate from "../../../components/dashboard/UpdateForm/StudentUpdate";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { user, loading, setLoading } = useAuth();
  const { email } = user;
  const { Option } = Select;

  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);
  const [roleInfo, setRoleInfo] = useState(null);
  const [classes, setClasses] = useState(null);

  useEffect(() => {
    if (email) {
      fetchUserInfo();
      fetchAllClassInfo();
    }
  }, [email]);

  useEffect(() => {
    if (userInfo) {
      fetchRoleInfo();
      form.setFieldsValue(userInfo); // Populate form fields when data is fetched
    }
  }, [userInfo, form]);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosSecure(`/api/user/${email}`);
      setUserInfo(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllClassInfo = async () => {
    try {
      const { data } = await axiosSecure(`/api/class`);
      setClasses(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRoleInfo = async () => {
    try {
      // const {data} = await axiosSecure(`/api/`)
      if (userInfo.role === "STUDENT") {
        const { data } = await axiosSecure(
          `/api/student/user_id/${userInfo.id}`
        );
        setRoleInfo(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to calculate age from DOB
  const calculateAge = (dob) => {
    if (!dob) return "";
    return dayjs().diff(dayjs(dob), "year"); // Get difference in years
  };

  // Handle DOB change dynamically
  const handleDobChange = (date) => {
    const newAge = calculateAge(date);
    console.log(newAge);
    form.setFieldsValue({ age: newAge }); // Update age field dynamically
  };

  const handleSubmit = (values) => {
    setLoading(true);
    console.log(values);
    console.log(values.dob.format("YYYY-MM-DD"));
    setLoading(false);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full mx-auto ">
        {/* name  */}
        <Form.Item
          label="User Name"
          name="name"
          rules={[
            { required: true, message: "Please input your Name!" },
            { type: "text", message: "Please enter a valid string!" },
          ]}
        >
          <Input defaultValue={userInfo?.name} />
        </Form.Item>

        {/* email  */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input defaultValue={userInfo?.email} disabled />
        </Form.Item>

        {/* DATE OF BIRTH  */}
        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" onChange={handleDobChange} />
        </Form.Item>

        {/* Age Field (Auto Updates) */}
        <Form.Item
          name="age"
          label="Age"
          rules={[
            {
              required: true,
              message: "Please input your Date of birth for age",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>

        {/* Gender  */}
        <Form.Item
          name="gender"
          label="Gender"
          rules={[{ required: true, message: "Insert your Gender" }]}
        >
          <Select defaultValue={userInfo?.gender}>
            <Option key={"male"} values="MALE">
              MALE
            </Option>
            <Option key={"female"} values="FEMALE">
              FEMALE
            </Option>
            <Option values="">select your gender</Option>
          </Select>
        </Form.Item>

        {/* phone  */}
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "Please input your Phone number!" },
          ]}
        >
          <Input defaultValue={userInfo?.phone} />
        </Form.Item>
      </div>

      {userInfo?.role === "STUDENT" && (
        <StudentUpdate roleInfo={roleInfo} classes={classes} />
      )}

      <Button type="primary" htmlType="submit" loading={loading}>
        Update User
      </Button>
    </Form>
  );
};

export default UpdateProfile;
