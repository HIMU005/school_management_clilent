import { FcVoicePresentation } from "react-icons/fc";
import { MdCoPresent } from "react-icons/md";
import EachNavigationItem from "./EachNavigationItem";

const TeacherRouter = () => {
  return (
    <div>
      <EachNavigationItem
        icon={MdCoPresent}
        direction={"/dashboard/take-attendance"}
        title={"Attendance"}
      />
      <EachNavigationItem
        // icon={MdCoPresent}
        icon={FcVoicePresentation}
        direction={"/dashboard/see-attendance"}
        title={"See Attendance"}
      />
    </div>
  );
};

export default TeacherRouter;
