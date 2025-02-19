import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
const Profile = () => {
  // todo: configure it using image according to ant design website
  return (
    <Space>
      <Avatar
        style={{
          backgroundColor: "#87d068",
        }}
        icon={<UserOutlined />}
      />
    </Space>
  );
};

export default Profile;
