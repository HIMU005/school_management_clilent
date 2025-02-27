import { Outlet } from "react-router";
import DashboardNav from "../components/dashboard/shared/DashboardNav";

const DashBoardLayout = () => {
  return (
    <div className="flex  justify-start gap-2">
      <DashboardNav />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
