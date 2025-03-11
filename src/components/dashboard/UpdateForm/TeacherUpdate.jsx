import { Form } from "antd";
import { useEffect } from "react";

/* eslint-disable react/prop-types */
const TeacherUpdate = ({ roleInfo, form }) => {
  console.log(roleInfo);

  useEffect(() => {
    if (roleInfo) {
      form.setFieldValues({
        roleData: {
          id: roleInfo.id,
          position: roleInfo.position || "",
          passedFrom: roleInfo.passedFrom || "",
          joiningDate: roleInfo?.joiningDate,
        },
      });
    }
  }, []);

  return (
    <>
      <Form.Item></Form.Item>
    </>
  );
};

export default TeacherUpdate;
