import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useAdmin = () => {
   const { user } = useAuth();
   const axiosPublic = useAxiosPublic();

   const { data: isAdmin, isPending: isAdminLoadin } = useQuery({
      queryKey: [user?.email, 'isAdmin'],
      queryFn: async () => {
         const res = await axiosPublic.get(`/allUsers/admin/${user.email}`);
         return res.data?.admin;
      }
   })

   return [isAdmin, isAdminLoadin]
};

export default useAdmin;
