import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Loader from "../../Shared/Loader/Loader";
import ShowLeaderBoardIndividualInfo from "../ShowLeaderBoardIndividualInfo/ShowLeaderBoardIndividualInfo";
import CustomPagination from "../../../Components/CustomPagination/CustomPagination";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const LeaderBoard = () => {
   const axiosPublic = useAxiosPublic();
   const [allClubUsers, setAllClubUsers] = useState([]);
   const { result } = useLoaderData();
   const [page, setPage] = useState(1);
   const [loading, setLoading] = useState(true);
   const perPageItem = 8;

   const handlePagination = (e, p) => {
      if (p != page) {
         setLoading(true);
      }
      setPage(p);
   }

   useEffect(() => {
      axiosPublic.get(`/leaderboard?page=${page - 1}&size=${perPageItem}`)
         .then(res => {
            setAllClubUsers(res.data);
            setLoading(false);
         })
   }, [axiosPublic, page])

   return (
      <div>
         <Helmet>
            <title>Leaderboard</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Leaderboard"}></SectionTitle>
         </div>
         {
            loading ?
               <Loader></Loader>
               :
               <>
                  <div className="overflow-x-auto w-[95%] mx-auto mt-8">
                     <table className="table w-[65%] mx-auto bg-zinc-900 rounded-lg">
                        <thead className="leading-8">
                           <tr>
                              <th>Club Rank</th>
                              <th>Image</th>
                              <th>Name</th>
                              <th>CF Handle</th>
                              <th>Current Rating</th>
                              <th>Max Rating</th>
                           </tr>
                        </thead>
                        <tbody>
                           {
                              allClubUsers.map((singleClubUser, clubRank) =>
                                 <ShowLeaderBoardIndividualInfo
                                    key={singleClubUser._id}
                                    clubUser={singleClubUser}
                                    clubRank={clubRank + ((page - 1) * 8)}
                                 ></ShowLeaderBoardIndividualInfo>)
                           }
                        </tbody>
                     </table>
                  </div>
               </>
         }
         <CustomPagination result={result} handlePagination={handlePagination} perPageItem={perPageItem}></CustomPagination>
         <div className="mb-6"></div>
      </div>
   );
};

export default LeaderBoard;