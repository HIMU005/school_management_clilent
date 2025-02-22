import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { FcGoogle } from "react-icons/fc";

import { updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { imageUpload } from "../../api/imageUpload";
import Loading from "../../components/shared/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxios";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignUp = () => {
  const { createUser, setUser, setLoading, googleLogin, loading } = useAuth();
  const axiosCommon = useAxiosCommon();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const { email, name, password, confirmPassword, image } = values;

    if (password !== confirmPassword) {
      return toast.error("password and confirm Password should be same");
    }

    try {
      const photo = await imageUpload(image.file); //upload image
      const result = await createUser(email, password); //create user
      updateProfile(result.user, {
        displayName: name,
        photoURL: photo,
      }); //update user info

      // upload data to db is here
      const uploadInfo = { name, email, profileImge: photo, password };

      // upload in backend
      const { data } = await axiosCommon.post("/api/user", uploadInfo);

      if (data.status === 201) {
        toast.success(
          `${result.user.email} your registration successfully finished`
        );
        setUser(result.user);
        navigate("/");
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    console.log(result);
  };

  return (
    <div>
      <div className="flex justify-center flex-col max-w-96 mx-auto">
        <Form
          className="border border-red-500"
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          {/* userName here  */}
          <Form.Item
            label="User Name"
            name="name"
            rules={[
              { required: true, message: "Please input your Name!" },
              { type: "text", message: "Please enter a valid string!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* email here  */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* password here  */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password!" },
              {
                min: 8,
                message: "Password must be at least 8 characters long.",
              },
              {
                max: 15,
                message: "Password must be at most 15 characters long.",
              },
              {
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Password must contain an uppercase letter, a lowercase letter, a number, and a special character.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* confirm password password here  */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please re input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {/* profile image  */}
          <Form.Item label="Upload Image" name="image">
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              {loading ? <Loading custom="text-white" /> : "Submit"}
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-around gap-3 ">
          <button onClick={handleGoogleLogin} className="btn">
            <FcGoogle className="text-lg mr-1.5  " /> Connect with Google
          </button>
        </div>

        <Loading />

        <p>
          Already have account on our website ?
          <Link to={"/login"} className="btn btn-link  ">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
