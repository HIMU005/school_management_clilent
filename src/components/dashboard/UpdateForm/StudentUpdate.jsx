/* eslint-disable react/prop-types */
import { Form, Input, Select } from "antd";

const StudentUpdate = ({ roleInfo, classes }) => {
  console.log(roleInfo?.id);
  console.log(roleInfo);
  const { Option } = Select;

  return (
    <>
      <Form.Item
        name={["roleData", "id"]}
        label="Student Id"
        initialValue={roleInfo?.id}
      >
        <Input value={roleInfo?.id} />
      </Form.Item>

      <Form.Item
        name={["roleData", "class_id"]}
        label="Section"
        rules={[{ required: true }]}
      >
        <Select>
          {classes.map((singleClass) => (
            <Option key={singleClass?.id}>{singleClass?.name}</Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};

export default StudentUpdate;
