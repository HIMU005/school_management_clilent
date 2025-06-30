import { FaBookMedical } from "react-icons/fa";
import EachNavigationItem from "./EachNavigationItem";

function AdminRouter() {
  return (
    <>
      <EachNavigationItem
        icon={FaBookMedical}
        direction={"/dashboard/add-subject"}
        title={"Add Subject"}
        cls=""
      />
    </>
  );
}

export default AdminRouter;
