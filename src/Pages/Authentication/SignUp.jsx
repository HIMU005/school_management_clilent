import { Button, Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";

import { updateProfile } from "firebase/auth";
import { Link } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
// const onFinish = (values) => {
//   console.log("Success:", values);
// };
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignUp = () => {
  const { createUser, setUser, setLoading, googleLogin } = useAuth();
  const onFinish = async (values) => {
    const { email, name, password, confirmPassword } = values;
    console.log(name, confirmPassword);
    const result = await createUser(email, password);

    updateProfile(result.user, {
      displayName: name,
      // photoURL: photo,
    });
    setUser(result.user);
    setLoading(false);
    toast.success(
      `${result.user.email} your registration successfully finished`
    );
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    console.log(result.user);
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
              {
                required: true,
                message: "Please input your password!",
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

          {/* <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item> */}

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>

        <div className="flex justify-around gap-3 ">
          <button onClick={handleGoogleLogin} className="btn">
            <FcGoogle className="text-lg mr-1.5  " /> Connect with Google
          </button>
        </div>

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
