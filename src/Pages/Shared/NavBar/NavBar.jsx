import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAdmin from "../../../Hooks/useAdmin";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect, useState } from "react";


const NavBar = () => {
   const { user, logOut } = useAuth();
   const [isAdmin] = useAdmin();
   const axiosPublic = useAxiosPublic();
   const [userInfo, setUserInfo] = useState([]);

   useEffect(() => {
      axiosPublic.get(`/allUsers/${user?.email}`)
         .then(res => {
            setUserInfo(res.data);
         })
   }, [axiosPublic, user?.email])

   const handleLogout = () => {
      logOut()
         .then(res => {
            Swal.fire({
               position: "top-end",
               icon: "success",
               title: "Logout Successfully",
               showConfirmButton: false,
               timer: 1500
            });
         })
   }

   const navOptions = <>
      <li>
         <NavLink to="/resultTypes"> <span className="font-bold rounded-md">CONTEST RESULTS</span> </NavLink>
      </li>
      <li>
         <NavLink to="/leaderBoard"><span className="font-bold rounded-md">LEADERBOARD</span></NavLink>
      </li>
      {
         isAdmin &&
         <li>
            <NavLink to="/dashboard/addContest"><span className="font-bold rounded-md">DASHBOARD</span></NavLink>
         </li>
      }
      {
         user ?
            <li onClick={handleLogout}>
               <Link><button className="font-bold rounded-md">LOGOUT</button></Link>
            </li>
            :
            <li>
               <NavLink to="/login"><span className="font-bold rounded-md">LOGIN</span></NavLink>
            </li>
      }
   </>
   return (
      <>
         <div className="navbar bg-base-100">
            <div className="navbar-start">
               <div className="dropdown">
                  <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M4 6h16M4 12h8m-8 6h16" />
                     </svg>
                  </div>
                  <ul
                     tabIndex={0}
                     className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                     {
                        navOptions
                     }
                  </ul>
               </div>
               <Link to="/">
                  <div className="w-14 rounded">
                     <img src="https://i.ibb.co.com/447Dppr/create-a-problem-solving-club-creative-design-name-1-removebg-preview.png" />
                  </div>
               </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
               <ul className="menu menu-horizontal px-1">
                  {
                     navOptions
                  }
               </ul>
            </div>
            <div className="navbar-end font-medium underline">
               <a>{userInfo?.name}</a>
            </div>
         </div>
      </>
   );
};

export default NavBar;