import dayjs from "dayjs";
import InformationAsInput from "./InformationAsInput";
/* eslint-disable react/prop-types */
const ShowTeacherInformation = ({ roleInfo }) => {
  console.log(roleInfo?.joiningDate);
  return (
    <div>
      {/* teacher id  */}
      <InformationAsInput
        userInfoValue={roleInfo?.id}
        labelTitle={"Teacher Id :"}
      />

      {/* position  */}
      <InformationAsInput
        userInfoValue={roleInfo?.position}
        labelTitle={"Position :"}
      />

      {/* passed from  */}
      <InformationAsInput
        userInfoValue={roleInfo?.passedFrom}
        labelTitle={"Passed From :"}
      />

      {/* joiningDate  */}
      <InformationAsInput
        userInfoValue={
          roleInfo?.joiningDate
            ? dayjs(roleInfo.joiningDate).format("DD-MM-YYYY")
            : null
        }
        labelTitle={"Joining Date :"}
      />
    </div>
  );
};

export default ShowTeacherInformation;
