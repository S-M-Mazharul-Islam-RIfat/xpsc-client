import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { IoMdAddCircleOutline, IoMdHome, IoMdPersonAdd } from "react-icons/io";
import { IoBookmarks } from "react-icons/io5";
import { MdLeaderboard, MdOutlineSettings } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="flex w-full">
         <div className="flex">
            <div className="absolute top-4 left-4 z-50 md:hidden">
               <button onClick={() => setIsOpen(!isOpen)} className="text-3xl">
                  {isOpen ? "✕" : "☰"}
               </button>
            </div>
            <div
               className={`fixed top-0 left-0 h-full w-64 bg-cyan-500 text-black p-4 z-40 transform transition-transform 
         ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:min-h-screen md:flex md:flex-col`}
            >
               <div className="pt-4 pb-2">
                  <NavLink to="/">
                     <p className="text-center text-[2.3rem] font-semibold pt-3">XPSC</p>
                  </NavLink>
               </div>
               <ul className="menu text-[1rem] leading-7">
                  <li className="font-medium">
                     <NavLink to="/dashboard/addContest">
                        <IoMdAddCircleOutline />
                        Add Contest
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/dashboard/manageContest">
                        <MdOutlineSettings />
                        Manage Contest
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/dashboard/addClubUser">
                        <IoMdPersonAdd />
                        Add Club User
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/dashboard/manageClubUser">
                        <FaUsers />
                        Manage Club Users
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/dashboard/manageAllUsers">
                        <FaUsersGear />
                        Manage All Users
                     </NavLink>
                  </li>
               </ul>
               <div className="divider m-0 mt-3 w-52 mx-auto bg-black h-[0.08rem]"></div>
               <ul className="menu text-[1rem] leading-7">
                  <li className="font-medium">
                     <NavLink to="/">
                        <IoMdHome />
                        Home
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/leaderboard">
                        <MdLeaderboard />
                        Leaderboard
                     </NavLink>
                  </li>
                  <li className="font-medium">
                     <NavLink to="/resultTypes">
                        <IoBookmarks />
                        Contest Results
                     </NavLink>
                  </li>
               </ul>
            </div>

            {isOpen && (
               <div
                  className="fixed inset-0 md:hidden"
                  onClick={() => setIsOpen(false)}
               />
            )}
         </div>
         <div className="flex-1 p-6">
            <Outlet></Outlet>
         </div>
      </div>
   );
};

export default DashBoard;