// eslint-disable-next-line react/prop-types
const EachNavigationItem = ({ icon: Icon, title }) => {
  return (
    <div className="flex items-center gap-3 p-2 text-white hover:bg-gray-700 cursor-pointer rounded-md">
      <Icon className="text-3xl " />
      <h2>{title}</h2>
    </div>
  );
};

export default EachNavigationItem;
