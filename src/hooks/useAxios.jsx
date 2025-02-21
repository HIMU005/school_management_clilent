import axios from "axios";
const axiosCommon = axios.create({
  baseUrl: "http://localhost:8000",
});

const useAxiosCommon = () => {
  return axiosCommon;
};
export default useAxiosCommon;
