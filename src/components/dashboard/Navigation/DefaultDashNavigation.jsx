import { IoLogOutOutline } from "react-icons/io5";
import EachNavigationItem from "./EachNavigationItem";

const DefaultDashNavigation = () => {
  return (
    <div>
      <EachNavigationItem icon={IoLogOutOutline} title={"Logout"} />
      <EachNavigationItem icon={IoLogOutOutline} title={"Logout"} />
      <EachNavigationItem icon={IoLogOutOutline} title={"Logout"} />
      <EachNavigationItem icon={IoLogOutOutline} title={"Logout"} />
    </div>
  );
};

export default DefaultDashNavigation;
