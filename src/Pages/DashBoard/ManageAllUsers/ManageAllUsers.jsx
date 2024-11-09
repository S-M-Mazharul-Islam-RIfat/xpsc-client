import { Helmet } from "react-helmet-async";
import useAllUsers from "../../../Hooks/useAllUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader/Loader";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageAllUsers = () => {
   const [allUsers, loading, refetch] = useAllUsers();
   const axiosSecure = useAxiosSecure();
   const handleDelete = user => {
      Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      }).then(async (result) => {
         if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/allUsers/${user._id}`);
            if (res.data.deletedCount) {
               refetch();
               Swal.fire({
                  title: "Deleted!",
                  text: `${user.name} has been deleted`,
                  icon: "success"
               });
            }
         }
      });
   }

   const handleRole = async (user) => {
      const updatedUser = {
         name: user.name,
         email: user.email,
         role: user.role === "user" ? "admin" : "user"
      }
      const res = await axiosSecure.patch(`/allUsers/${user._id}`, updatedUser)
      if (res.data.modifiedCount) {
         refetch();
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Role Updated Successfully",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <div>
         <Helmet>
            <title>Manage All User</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Manage All User"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <>
                  <div className="py-6 overflow-x-auto">
                     <table className="table w-[80%] mx-auto bg-zinc-900 rounded-lg">
                        <thead>
                           <tr className="leading-8">
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Role</th>
                              <th>Action</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              allUsers.map((user, index) =>
                                 <tr key={user._id} className="hover leading-8">
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-nowrap">{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{(user.role[0]).toUpperCase()}{(user.role).slice(1, user.role.length)}</td>
                                    <td>
                                       {
                                          user?.role == 'user' ?
                                             <button onClick={() => handleRole(user)} className="custom-update-btn text-white">
                                                Make Admin
                                             </button>
                                             :
                                             <button onClick={() => handleRole(user)} className="custom-update-btn text-white">
                                                Make User
                                             </button>
                                       }
                                    </td>
                                    <td><button onClick={() => handleDelete(user)} className="custom-delete-btn text-white">Delete</button></td>
                                 </tr>
                              )
                           }
                        </tbody>
                     </table>
                  </div>
               </>
         }
      </div>
   );
};

export default ManageAllUsers;