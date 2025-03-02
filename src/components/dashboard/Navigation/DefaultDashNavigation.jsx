import { FaUserFriends } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import EachNavigationItem from "./EachNavigationItem";

const DefaultDashNavigation = () => {
  const { logOut } = useAuth();
  return (
    <div>
      <EachNavigationItem
        icon={FaUserFriends}
        title={"Profile"}
        direction={"profile"}
      />

      {/* logout at the end  */}
      <EachNavigationItem
        icon={IoLogOutOutline}
        title={"Logout"}
        action={logOut}
      />
    </div>
  );
};

export default DefaultDashNavigation;
