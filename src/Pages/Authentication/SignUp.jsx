import { Button, Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";

import { Link } from "react-router";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const SignUp = () => {
  return (
    <div>
      {" "}
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
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

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
          <Link className="btn">
            <FcGoogle className="text-lg mr-1.5  " /> Connect with Google
          </Link>
        </div>

        <p>
          First time on the website.
          <Link to={"/signup"} className="btn btn-link  ">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
