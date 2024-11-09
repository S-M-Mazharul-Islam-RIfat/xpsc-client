import {
   createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";

import ResultTypes from "../Pages/Results/ResultTypes/ResultTypes";
import Home from "../Pages/Home/Home";
import CodeforcesContestListOfParticipants from "../Pages/Results/CodeforcesContestListOfParticipants/CodeforcesContestListOfParticipants";
import CodeforcesContestListOfNonParticipants from './../Pages/Results/CodeforcesContestListOfNonParticipants/CodeforcesContestListOfNonParticipants';
import CodeforcesIndividualContestResultOfParticipants from './../Pages/Results/CodeforcesIndividualContestResultOfParticipants/CodeforcesIndividualContestResultOfParticipants';
import CodeforcesIndividualContestResultOfNonParticipants from './../Pages/Results/CodeforcesIndividualContestResultOfNonParticipants/CodeforcesIndividualContestResultOfNonParticipants';
import LeaderBoard from "../Pages/LeaderBoard/LeaderBoard/LeaderBoard";
import DashBoard from "../Layout/DashBoard";
import AddContest from "../Pages/DashBoard/AddContest/AddContest";
import ManageContest from "../Pages/DashBoard/ManageContest/ManageContest";
import UpdateContest from "../Pages/DashBoard/UpdateContest/UpdateContest";
import AddClubUser from "../Pages/DashBoard/AddClubUser/AddClubUser";
import ManageClubUsers from "../Pages/DashBoard/ManageClubUsers/ManageClubUsers";
import UpdateClubUser from "../Pages/DashBoard/UpdateClubUser/UpdateClubUser";
import ExportData from "../Pages/DashBoard/ExportData/ExportData";
import ManageAllUsers from "../Pages/DashBoard/ManageAllUsers/ManageAllUsers";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";


export const router = createBrowserRouter([
   {
      path: "/",
      element: <Main></Main>,
      children: [
         {
            path: '/',
            element: <Home></Home>
         },
         {
            path: 'resultTypes',
            element: <PrivateRoute><ResultTypes></ResultTypes></PrivateRoute>,
         },
         {
            path: 'resultTypes/codeforcesContestListOfParticipants',
            loader: () => fetch('http://localhost:5000/codeforcesContestList'),
            element: <PrivateRoute><CodeforcesContestListOfParticipants></CodeforcesContestListOfParticipants></PrivateRoute>
         },
         {
            path: 'resultTypes/codeforcesContestListOfNonParticipants',
            loader: () => fetch('http://localhost:5000/codeforcesContestList'),
            element:
               <PrivateRoute>
                  <CodeforcesContestListOfNonParticipants></CodeforcesContestListOfNonParticipants>
               </PrivateRoute>
         },
         {
            path: 'resultTypes/codeforcesContestListOfParticipants/:contestId',
            loader: ({ params }) => fetch(`http://localhost:5000/codeforcesContestParticipantsResultsCountByContestId/${params.contestId}`),
            element: <PrivateRoute><CodeforcesIndividualContestResultOfParticipants></CodeforcesIndividualContestResultOfParticipants></PrivateRoute>
         },
         {
            path: 'resultTypes/codeforcesContestListOfNonParticipants/:contestId',
            loader: ({ params }) => fetch(`http://localhost:5000/codeforcesContestNonParticipantsResultsCountByContestId/${params.contestId}`),
            element: <PrivateRoute><CodeforcesIndividualContestResultOfNonParticipants></CodeforcesIndividualContestResultOfNonParticipants></PrivateRoute>
         },
         {
            path: 'leaderBoard',
            element: <PrivateRoute><LeaderBoard></LeaderBoard></PrivateRoute>,
            loader: () => fetch(`http://localhost:5000/clubUsersCount`)
         },
         {
            path: 'about',
            element: <About></About>
         },
         {
            path: 'login',
            element: <Login></Login>
         },
         {
            path: 'signup',
            element: <SignUp></SignUp>
         },
      ]
   },
   {
      path: 'dashboard',
      element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
      children: [
         {
            path: 'addContest',
            element: <AdminRoute><AddContest></AddContest></AdminRoute>
         },
         {
            path: 'manageContest',
            element: <AdminRoute><ManageContest></ManageContest></AdminRoute>,
         },
         {
            path: 'updateContest/:id',
            element: <AdminRoute><UpdateContest></UpdateContest></AdminRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/codeforcesContstList/${params.id}`)
         },
         {
            path: 'addClubUser',
            element: <AdminRoute><AddClubUser></AddClubUser></AdminRoute>
         },
         {
            path: 'manageClubUser',
            element: <AdminRoute><ManageClubUsers></ManageClubUsers></AdminRoute>,
            loader: () => fetch(`http://localhost:5000/clubUsersCount`)
         },
         {
            path: 'updateClubUser/:id',
            element: <AdminRoute><UpdateClubUser></UpdateClubUser></AdminRoute>,
            loader: ({ params }) => fetch(`http://localhost:5000/clubUsers/${params.id}`)
         },
         {
            path: 'exportData',
            element: <AdminRoute><ExportData></ExportData></AdminRoute>
         },
         {
            path: 'manageAllUsers',
            element: <AdminRoute><ManageAllUsers></ManageAllUsers></AdminRoute>
         }
      ]
   }
]);