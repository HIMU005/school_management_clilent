import { useState } from "react";
import { Outlet } from "react-router";
import DashboardNav from "../components/dashboard/shared/DashboardNav";

const DashBoardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex  justify-start gap-2">
      <DashboardNav isOpen={isOpen} setIsOpen={setIsOpen} />
      <div
        className={`transition-all duration-500 flex-1 ${
          isOpen ? "md:ml-96" : "md:ml-0"
        }`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoardLayout;
