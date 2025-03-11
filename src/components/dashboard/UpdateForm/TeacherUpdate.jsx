import { Form, Input } from "antd";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const TeacherUpdate = ({ roleInfo, form }) => {
  // console.log(roleInfo);

  useEffect(() => {
    if (roleInfo) {
      form.setFieldsValue({
        roleData: {
          id: roleInfo?.id,
          position: roleInfo?.position || "",
          passedFrom: roleInfo?.passedFrom || "",
          joiningDate: roleInfo?.joiningDate,
        },
      });
    }
  }, [roleInfo, form]);

  return (
    <>
      <Form.Item name={["roleData", "id"]} label={"Teacher Id :"}>
        <Input disabled />
      </Form.Item>

      <Form.Item
        name={["roleData", "position"]}
        label={"Position :"}
        rules={[
          {
            required: true,
            message: "Enter your position in this organization",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["roleData", "passedFrom"]}
        label={"Passed From :"}
        rules={[
          { required: true, message: "Enter your college / varsity name " },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name={["roleData", "joiningDate"]} label={"Joining Date :"}>
        <Input disabled />
      </Form.Item>
    </>
  );
};

export default TeacherUpdate;
