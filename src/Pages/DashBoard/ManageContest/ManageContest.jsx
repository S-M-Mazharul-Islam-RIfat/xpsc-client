import { Helmet } from "react-helmet-async";
import useContest from "../../../Hooks/useContest";
import './ManageContest.css';
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Shared/Loader/Loader";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useClubUsers from "../../../Hooks/useClubUsers";
import { useState } from "react";

const ManageContest = () => {
   const [contest, loading, refetch] = useContest();
   const axiosSecure = useAxiosSecure();
   const [clubUsers] = useClubUsers();
   const [loader, setLoader] = useState(false);

   const handleDelete = singleContest => {
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
            const contestDeleteRes = await axiosSecure.delete(`/codeforcesContestList/${singleContest._id}`);
            const contestUserDataDeleteRes = await axiosSecure.delete(`/codeforcesContestAllUserResult/${singleContest.contestId}`);
            if ((contestDeleteRes.data.deletedCount >= 1) || (contestUserDataDeleteRes.data.deletedCount >= 0)) {
               refetch();
               Swal.fire({
                  title: "Deleted!",
                  text: `${singleContest.name} has been deleted`,
                  icon: "success"
               });
            }
         }
      });
   }

   const handleAdd = async (singleContestId, singleContestName) => {
      const contestResultCount = await axiosSecure.get(`/codeforcesContestAllUserResultCountByContestId/${singleContestId}`);
      if (contestResultCount?.data?.result === clubUsers.length) {
         Swal.fire({
            position: "top-end",
            icon: "warning",
            title: "This contest all users data already added",
            showConfirmButton: false,
            timer: 5000
         });
         return;
      }
      const usersCFHandle = [];
      const usersName = []
      const usersEmail = []
      const contestId = parseInt(singleContestId);
      const contestName = singleContestName;

      clubUsers.map(clubUser => {
         usersCFHandle.push(clubUser.codeforcesHandle);
         usersName.push(clubUser.name);
         usersEmail.push(clubUser.email);
      })

      const fetchDataAndMerge = async (user) => {
         try {
            const [userInfoResponse, contestStandingsResponse, userRatingResponse] = await Promise.all([
               fetch(`https://codeforces.com/api/user.info?handles=${user}`).then(response => response.json()),
               fetch(`https://codeforces.com/api/contest.standings?contestId=${contestId}&handles=${user}`).then(response => response.json()),
               fetch(`https://codeforces.com/api/user.rating?handle=${user}`).then(response => response.json())
            ]);

            if (userInfoResponse.status !== "OK" || contestStandingsResponse.status !== "OK" || userRatingResponse.status !== "OK") {
               return null;
            }

            const usersMap = new Map();
            const userInfoResult = userInfoResponse.result[0];
            if (userInfoResult) {
               const userCurrentData = {
                  userName: userInfoResult.handle,
                  currentRating: userInfoResult.rating,
                  maxRating: userInfoResult.maxRating,
                  currentRank: userInfoResult.rank,
                  maxRank: userInfoResult.maxRank
               };
               const userOldData = usersMap.get(user) || {};
               const userNewData = { ...userOldData, ...userCurrentData };
               usersMap.set(user, userNewData);
            }

            const contestStandingResult = contestStandingsResponse.result?.rows[0]?.problemResults;
            if (contestStandingResult) {
               let problemIndex = [], index = 'A';
               for (let i = 0; i < contestStandingResult.length; i++) {
                  if (contestStandingResult[i]?.bestSubmissionTimeSeconds) {
                     problemIndex.push(String.fromCharCode(index.charCodeAt(0) + i));
                  }
               }
               const userCurrentData = {
                  solveCount: problemIndex.length,
                  solveProblems: problemIndex
               };
               const userOldData = usersMap.get(user);
               const userNewData = { ...userOldData, ...userCurrentData };
               usersMap.set(user, userNewData);
            }

            const participantsStatus = userRatingResponse?.result
            const currentContest = participantsStatus.filter(currContest => currContest.contestId === contestId);
            const userCurrentData = currentContest[0]?.contestId === contestId
               ? {
                  participate: 1,
                  globalStandings: currentContest[0].rank,
                  ratingChanges: currentContest[0].newRating - currentContest[0].oldRating
               }
               : {
                  participate: 0,
                  globalStandings: "N/A",
                  ratingChanges: 0
               };

            const userOldData = usersMap.get(user);
            const userNewData = { ...userOldData, ...userCurrentData };
            usersMap.set(user, userNewData);

            return Array.from(usersMap.values())[0];

         } catch (error) {
            console.error('Error fetching or merging data:', error);
            return null;
         }
      };

      const extractData = async () => {
         const fetchedUsers = [];
         let i = 0;
         while (i < usersCFHandle.length) {
            const userDataAlreadyExist = await axiosSecure.get(`/codeforcesContestIndividualUserResult?contestId=${singleContestId}&codeforcesHandle=${usersCFHandle[i]} `);
            if (userDataAlreadyExist?.data) {
               i++;
               continue;
            }
            const data = await fetchDataAndMerge(usersCFHandle[i]);
            if (data) {
               fetchedUsers.push({
                  ...data,
                  contestId,
                  contestName,
                  name: usersName[i],
                  userEmail: usersEmail[i]
               });
               const insertResult = axiosSecure.post('/codeforcesContestIndividualUserResult', fetchedUsers.at(-1));
               if (insertResult.data) {
                  // 
               }
               i++;
            }
            else {
               continue;
            }
         }
      };

      setLoader(true);
      await extractData();
      setLoader(false);
      Swal.fire({
         position: "center",
         icon: "success",
         title: `${contestName} pariticipants data added successfully`,
         showConfirmButton: false,
         timer: 2500
      });
   }

   return (
      <div>
         <Helmet>
            <title>Manage Contest</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Manage Contest"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <>
                  <div className="py-6 overflow-x-auto">
                     <table className="table w-[80%] mx-auto bg-zinc-900 rounded-lg">
                        <thead>

                           <tr className="leading-10">
                              <th>#</th>
                              <th>Contest Name</th>
                              <th>Contest Date</th>
                              <th>Contest Time</th>
                              <th>Contest Duration</th>
                              <th>Action</th>
                              <th>Action</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              contest.map((singleContest, contestNo) =>
                                 <tr key={singleContest._id} className="hover leading-10">
                                    <td className="text-center">{contestNo + 1}</td>
                                    <td className="text-nowrap">{singleContest.contestName}</td>
                                    <td>{singleContest.contestDate}</td>
                                    <td className="text-nowrap">{singleContest.contestStartTime}-{singleContest.contestEndTime}</td>
                                    <td>{singleContest.contestDuration}</td>
                                    <td><button onClick={() => handleAdd(singleContest.contestId, singleContest.contestName)} className="custom-add-btn text-white">Add</button></td>
                                    <td>
                                       <Link to={`/dashboard/updateContest/${singleContest._id}`}>
                                          <button className="custom-update-btn text-white">Update</button>
                                       </Link>
                                    </td>
                                    <td><button onClick={() => handleDelete(singleContest)} className="custom-delete-btn text-white">Delete</button></td>
                                 </tr>
                              )
                           }
                        </tbody>
                     </table>
                  </div>
               </>
         }
         {
            loader && <Loader></Loader>
         }
      </div>
   );
};

export default ManageContest;