import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useClubUsers = () => {
   const axiosSecure = useAxiosSecure();
   const { data: clubUsers = [], isPending: loading, refetch } = useQuery({
      queryKey: ['clubUsers'],
      queryFn: async () => {
         const res = await axiosSecure.get('/clubUsers')
         return res.data;
      }
   })

   return [clubUsers, loading, refetch];
};

export default useClubUsers;