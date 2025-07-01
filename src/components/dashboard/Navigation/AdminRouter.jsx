import { FaBookMedical } from "react-icons/fa";
import { IoIosBookmarks } from "react-icons/io";
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
      <EachNavigationItem
        icon={IoIosBookmarks}
        direction={"/dashboard/all-subjects"}
        title={"All Subjects"}
        cls=" text-blue-500 hover:text-blue-700"
      />
    </>
  );
}

export default AdminRouter;
