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
    </div>
  );
};

export default TeacherRouter;
