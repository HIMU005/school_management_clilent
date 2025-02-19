import { Button, Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = () => {
  const { loginUser, setUser, setLoading, googleLogin } = useAuth();

  const onFinish = async (values) => {
    const { email, password } = values;
    const result = await loginUser(email, password);

    setUser(result.user);
    setLoading(false);
    toast.success(`${result.user.email} your login  successfully done`);
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    console.log(result.user);
  };
  return (
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
        {/* email here  */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
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
        First time on the website.?
        <Link to={"/signup"} className="btn btn-link  ">
          Register now
        </Link>
      </p>
    </div>
  );
};

export default Login;
