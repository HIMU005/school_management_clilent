/* eslint-disable react/prop-types */
import InformationAsInput from "./InformationAsInput";

const ShowStudentInformation = ({ roleInfo }) => {
  //   console.log(roleInfo);
  return (
    <div>
      {/* student ID  */}
      <InformationAsInput
        userInfoValue={roleInfo?.id}
        labelTitle={"Student Id"}
      />

      {/* Session  */}
      <InformationAsInput
        userInfoValue={roleInfo?.session}
        labelTitle={"session"}
      />
      {/* class  */}
      <InformationAsInput
        userInfoValue={roleInfo?.class_id}
        labelTitle={"Class "}
      />
    </div>
  );
};

export default ShowStudentInformation;
