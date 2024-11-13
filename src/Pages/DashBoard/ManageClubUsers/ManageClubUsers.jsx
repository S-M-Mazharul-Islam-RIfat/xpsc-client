import { Helmet } from "react-helmet-async";
import useClubUsers from "../../../Hooks/useClubUsers";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader/Loader";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ManageClubUsers = () => {
   const [clubUsers, loading, refetch] = useClubUsers();
   const axiosSecure = useAxiosSecure();

   const handleDelete = clubUser => {
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
            const res = await axiosSecure.delete(`/clubUsers/${clubUser._id}`);
            const clubUserContestResultDeleteRes = await axiosSecure.delete(`/codeforcesContestIndividualUserResult/${clubUser.codeforcesHandle}`);
            if ((res.data.deletedCount >= 1) || (clubUserContestResultDeleteRes.data.deletedCount >= 0)) {
               refetch();
               Swal.fire({
                  title: "Deleted!",
                  text: `Club user has been deleted`,
                  icon: "success"
               });
            }
         }
      });
   }

   return (
      <div>
         <Helmet>
            <title>Dashboard | Manage Club Users</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Manage Club Users"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <>
                  <div className="mt-8 overflow-x-auto">
                     <table className="table w-[85%] mx-auto bg-zinc-900 rounded-lg">
                        <thead>
                           <tr className="leading-8">
                              <th>#</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Email</th>
                              <th>Mobile Number</th>
                              <th>CF Username</th>
                              <th>CF Curent Rating</th>
                              <th>CF Max Rating</th>
                              <th>Action</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              clubUsers.map((clubUser, index) =>
                                 <tr key={clubUser._id} className="hover leading-8">
                                    <td className="text-center">{index + 1}</td>
                                    <td>
                                       <div className="avatar">
                                          <div className="w-8 rounded-full">
                                             <img src={clubUser.image} />
                                          </div>
                                       </div>
                                    </td>
                                    <td className="text-nowrap">{clubUser.name}</td>
                                    <td>{clubUser.email}</td>
                                    <td>{clubUser.mobileNumber}</td>
                                    <td>{clubUser.codeforcesHandle}</td>
                                    <td>{clubUser.codeforcesCurrentRating}</td>
                                    <td>{clubUser.codeforcesMaxRating}</td>
                                    <td>
                                       <Link to={`/dashboard/updateClubUser/${clubUser._id}`}>
                                          <button style={{
                                             padding: '0px 12px',
                                             borderRadius: '5px',
                                             backgroundColor: '#dd9000',
                                             border: 'none'
                                          }} className="text-white">Update</button>
                                       </Link>
                                    </td>
                                    <td><button onClick={() => handleDelete(clubUser)} style={{
                                       padding: '0px 12px',
                                       borderRadius: '5px',
                                       backgroundColor: '#cf4141',
                                       border: 'none'
                                    }} className="text-white">Delete</button></td>
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

export default ManageClubUsers;