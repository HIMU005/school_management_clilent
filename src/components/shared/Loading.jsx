/* eslint-disable react/prop-types */
import { ImSpinner6 } from "react-icons/im";

const Loading = ({ custom }) => {
  return <ImSpinner6 className={`animate-spin ${custom}`} />;
};

export default Loading;
