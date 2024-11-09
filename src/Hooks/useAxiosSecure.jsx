import axios from "axios";
import useAuth from './useAuth';
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
   baseURL: 'http://localhost:5000/'
})

const useAxiosSecure = () => {
   const navigate = useNavigate();
   const { logOut } = useAuth();

   axiosSecure.interceptors.request.use((config) => {
      config.withCredentials = true;
      return config;
   }, (error) => {
      return Promise.reject(error);
   })

   axiosSecure.interceptors.response.use((response) => {
      return response;
   }, async (error) => {
      const status = error.response.status;
      if (status === 401 || status == 403) {
         await logOut();
         navigate('/login');
      }
      return Promise.reject(error);
   })

   return axiosSecure;
};

export default useAxiosSecure;