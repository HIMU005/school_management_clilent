import { Form, Input } from "antd";

// eslint-disable-next-line react/prop-types
const InformationAsInput = ({ userInfoValue, labelTitle }) => {
  return (
    <Form.Item label={labelTitle}>
      {userInfoValue ? (
        <Input value={userInfoValue} disabled />
      ) : (
        <span className="text-red-500">Not Inserted</span>
      )}
    </Form.Item>
  );
};

export default InformationAsInput;
