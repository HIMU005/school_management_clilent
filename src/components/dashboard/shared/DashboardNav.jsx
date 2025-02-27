import { useState } from "react";
import { IoClose, IoReorderThreeOutline } from "react-icons/io5";
import DefaultDashNavigation from "../Navigation/DefaultDashNavigation";

const DashboardNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className={`${isOpen ? "text-white " : "text-black "} text-3xl z-[60] `}
      >
        {isOpen ? (
          <IoClose onClick={() => setIsOpen(!isOpen)} />
        ) : (
          <IoReorderThreeOutline onClick={() => setIsOpen(!isOpen)} />
        )}
      </div>
      <div
        className={`fixed top-0 left-0 h-screen w-96 bg-[#2C3E50] shadow-lg p-4 z-50 transform transition-transform duration-600 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full  ">
          <div></div>
          <div>
            <DefaultDashNavigation />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardNav;
