/* eslint-disable react-hooks/exhaustive-deps */
import { Button, DatePicker, Form, Input, Select } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import StudentUpdate from "../../../components/dashboard/UpdateForm/StudentUpdate";
import useAuth from "../../../hooks/useAuth";
import { axiosSecure } from "../../../hooks/useAxiosSecure";

const UpdateProfile = () => {
  const { user, loading, setLoading } = useAuth();
  const { email } = user;
  const { Option } = Select;
  const navigate = useNavigate();

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
      const validDob =
        userInfo.dob && dayjs(userInfo.dob).isValid()
          ? dayjs(userInfo.dob)
          : null;
      form.setFieldsValue({
        ...userInfo,
        dob: validDob, // Set dob only if it's valid, else set it to null
      });
    }
  }, [userInfo, form]);

  const fetchUserInfo = async () => {
    try {
      const { data } = await axiosSecure(`/api/user/${email}`);
      setUserInfo(data?.data);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const fetchAllClassInfo = async () => {
    try {
      const { data } = await axiosSecure(`/api/class`);
      setClasses(data?.data);
    } catch (error) {
      toast.error(error?.message);
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
      toast.error(error?.message);
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
    form.setFieldsValue({ age: newAge, dob: date }); // Update age field dynamically
  };

  const handleSubmit = async (values) => {
    try {
      setLoading(true);

      if (values.dob) {
        values.dob = dayjs(values.dob).toISOString(); // Converts to ISO 8601 format
      }
      values.role = userInfo.role;
      const { data } = await axiosSecure.put(
        `/api/update_user/${userInfo?.id}`,
        values
      );

      if (data.status === 200) {
        toast.success(`${data?.message}`);
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        name: userInfo?.name || "",
        email: userInfo?.email || "",
        phone: userInfo?.phone || "",
        gender: userInfo?.gender || "",
        dob: userInfo?.dob ? dayjs(userInfo.dob) : null,
        age: userInfo?.age || "",
      }}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-4 w-full mx-auto ">
        {/* name  */}
        <Form.Item
          label="User Name :"
          name="name"
          rules={[
            { required: true, message: "Please input your Name!" },
            { type: "text", message: "Please enter a valid string!" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* email  */}
        <Form.Item label="Email :" name="email">
          <Input disabled />
        </Form.Item>

        {/* DATE OF BIRTH  */}
        <Form.Item
          name="dob"
          label="Date of Birth :"
          rules={[
            { required: true, message: "Please select your date of birth" },
          ]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            onChange={handleDobChange}
            value={userInfo?.dob ? dayjs(userInfo?.dob) : null}
          />
        </Form.Item>

        {/* Age Field (Auto Updates) */}
        <Form.Item
          name="age"
          label="Age :"
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
          label="Gender:"
          rules={[{ required: true, message: "Please select your gender!" }]}
        >
          <Select value={userInfo?.gender || ""}>
            <Option value="MALE">MALE</Option>
            <Option value="FEMALE">FEMALE</Option>
          </Select>
        </Form.Item>

        {/* phone  */}
        <Form.Item
          label="Phone :"
          name="phone"
          rules={[
            { required: true, message: "Please input your Phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
      </div>

      {userInfo?.role === "STUDENT" && (
        <StudentUpdate roleInfo={roleInfo} classes={classes} form={form} />
      )}

      <Button
        type="primary"
        htmlType="submit"
        loading={loading}
        disabled={loading}
      >
        Update User
      </Button>
    </Form>
  );
};

export default UpdateProfile;
