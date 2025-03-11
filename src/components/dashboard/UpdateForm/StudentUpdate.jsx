/* eslint-disable react/prop-types */
import { Form, Input, Select } from "antd";
import { useEffect } from "react";

const StudentUpdate = ({ roleInfo, classes, form }) => {
  const { Option } = Select;

  useEffect(() => {
    if (roleInfo) {
      form.setFieldsValue({
        roleData: {
          id: roleInfo.id,
          class_id: roleInfo.class_id || undefined,
          session: roleInfo?.session || "",
        },
      });
    }
  }, [roleInfo, form]);

  return (
    <>
      {/* student id  */}
      <Form.Item name={["roleData", "id"]} label="Student Id :">
        <Input disabled />
      </Form.Item>

      {/* select class */}
      <Form.Item
        name={["roleData", "class_id"]}
        label="Class :"
        rules={[{ required: true }]}
      >
        <Select
          value={roleInfo?.class_id}
          onChange={(value) =>
            form.setFieldsValue({ roleData: { class_id: value } })
          }
        >
          {classes?.map((singleClass) => (
            <Option key={singleClass?.id} value={singleClass?.id}>
              {singleClass?.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* session */}
      <Form.Item name={["roleData", "session"]} label="Session :">
        <Input />
      </Form.Item>
    </>
  );
};

export default StudentUpdate;
