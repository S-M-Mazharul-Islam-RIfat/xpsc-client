import axios from "axios";

const axiosPublic = axios.create({
   baseURL: 'https://xpsc-86074.web.app'
})
const useAxiosPublic = () => {
   return axiosPublic;
};

export default useAxiosPublic;