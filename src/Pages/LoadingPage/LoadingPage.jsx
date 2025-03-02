import { Flex, Spin } from "antd";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center w-full h-screen  ">
      <Flex align="center" gap="middle">
        <Spin size="small" />
      </Flex>
    </div>
  );
};

export default LoadingPage;
