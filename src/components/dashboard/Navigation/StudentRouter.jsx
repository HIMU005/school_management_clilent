import { FcVoicePresentation } from "react-icons/fc";
import EachNavigationItem from "./EachNavigationItem";

function StudentRouter() {
  return (
    <>
      <EachNavigationItem
        // icon={MdCoPresent}
        icon={FcVoicePresentation}
        direction={"/dashboard/see-attendance-mine"}
        title={"See Attendance"}
      />
    </>
  );
}

export default StudentRouter;
