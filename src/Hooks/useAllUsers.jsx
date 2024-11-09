import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAllUsers = () => {
   const axiosSecure = useAxiosSecure();
   const { data: allUsers = [], isPending: loading, refetch } = useQuery({
      queryKey: ['allUsers'],
      queryFn: async () => {
         const res = await axiosSecure.get('/allUsers')
         return res.data;
      }
   })

   return [allUsers, loading, refetch];
};

export default useAllUsers;