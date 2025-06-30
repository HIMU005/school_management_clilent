/* eslint-disable react/prop-types */
import { Link } from "react-router";

const EachNavigationItem = ({
  icon: Icon,
  title,
  direction,
  action,
  cls = "",
}) => {
  return (
    <Link
      to={direction}
      onClick={action}
      className="flex items-center gap-3 p-2 text-white hover:bg-gray-700 cursor-pointer rounded-md"
    >
      <Icon className={`text-3xl ${cls} `} />
      <h2>{title}</h2>
    </Link>
  );
};

export default EachNavigationItem;
