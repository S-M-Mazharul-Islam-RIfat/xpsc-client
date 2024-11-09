import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
   const { user } = useAuth();
   const axiosSecure = useAxiosSecure();

   const { data: isAdmin, isPending: isAdminLoadin } = useQuery({
      queryKey: [user?.email, 'isAdmin'],
      queryFn: async () => {
         const res = await axiosSecure.get(`/allUsers/admin/${user.email}`);
         return res.data?.admin;
      }
   })

   return [isAdmin, isAdminLoadin]
};

export default useAdmin;
