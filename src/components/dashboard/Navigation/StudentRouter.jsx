import { FaCcAmazonPay } from "react-icons/fa";
import { FcVoicePresentation } from "react-icons/fc";
import { SiContactlesspayment } from "react-icons/si";
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
      <EachNavigationItem
        icon={FaCcAmazonPay}
        direction={"/dashboard/payment"}
        title={"Make Payment"}
        cls="text-yellow-400"
      />
      <EachNavigationItem
        icon={SiContactlesspayment}
        direction={"/dashboard/see-payment-list"}
        title={"See Payment List"}
        cls="text-green-500"
      />
    </>
  );
}

export default StudentRouter;
