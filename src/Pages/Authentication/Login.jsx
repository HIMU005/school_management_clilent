import { Button, Form, Input } from "antd";
import { FcGoogle } from "react-icons/fc";

import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import useAxiosCommon from "../../hooks/useAxiosCommon";

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = () => {
  const { loginUser, setUser, setLoading, googleLogin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state || "/";
  const axiosCommon = useAxiosCommon();

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const { data } = await axiosCommon(`/api/user/${email}`);
      if (data.status === 200) {
        const result = await loginUser(email, password);
        setUser(result.user);
        setLoading(false);
        navigate(from, { replace: true });
        toast.success(`${result.user.email} your login is successfully done`);
      } else {
        toast.error(data.message);
        navigate("/signup");
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    const result = await googleLogin();
    try {
      const photoURL = result?.user?.photoURL;
      const name = result?.user?.displayName;
      const email = result?.user?.email;
      const uploadInfo = { name, email, photoURL };

      // upload in backend
      const { data } = await axiosCommon.post(
        "/api/user/with-email",
        uploadInfo
      );
      if (data.status === 201) {
        setUser(result.user);
        setLoading(false);
        navigate(from, { replace: true });
        toast.success(
          `${result.user.email} your registration successfully finished`
        );
      }
      if (data.status === 400) {
        setUser(result.user);
        setLoading(false);
        navigate(from, { replace: true });
        toast.success(
          `${result.user.email} your credential was saved previously`
        );
      }
      setUser(result.user);
      navigate("/");
      setLoading(false);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      setLoading(false);
    }
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={loading}
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div className="flex justify-around gap-3 ">
        <button
          onClick={handleGoogleLogin}
          className="btn"
          disabled={loading}
          loading={loading}
        >
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
