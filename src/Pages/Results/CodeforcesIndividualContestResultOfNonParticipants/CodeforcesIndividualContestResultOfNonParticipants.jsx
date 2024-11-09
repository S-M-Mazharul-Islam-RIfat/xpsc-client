import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ShowCodeforcesContestIndividualNonParticipantsInfo from "../ShowCodeforcesContestIndividualNonParticipantsInfo/ShowCodeforcesContestIndividualNonParticipantsInfo";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import CustomPagination from "../../../Components/CustomPagination/CustomPagination";

const CodeforcesIndividualContestResultOfNonParticipants = () => {
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();
   const { result } = useLoaderData();
   const { contestId } = useParams();
   const [participantsInfo, setParticipantsInfo] = useState([]);
   const [page, setPage] = useState(1);
   const perPageItem = 10;
   const [contestInfo, setContestInfo] = useState([]);
   const handlePagination = (e, p) => {
      setPage(p);
   }

   useEffect(() => {
      axiosSecure.get(`/codeforcesContestNonParticipantsResultsByContestId?contestId=${contestId}&page=${page - 1}&size=${perPageItem}`)
         .then(res => {
            setParticipantsInfo(res.data);
         })
   }, [axiosSecure, contestId, page])

   useEffect(() => {
      axiosPublic.get(`/codeforcesSingleContestName?contestId=${contestId}`)
         .then(res => {
            setContestInfo(res.data);
         })
   }, [axiosPublic, contestId])

   return (
      <div>
         <Link> <h2 className="text-center mt-6 mb-8 text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-semibold">{contestInfo.contestName}</h2> </Link>
         <div className="overflow-x-auto">
            <table className="table w-[60%] mx-auto bg-zinc-900 rounded-lg">
               <thead>
                  <tr>
                     <th>Club Rank</th>
                     <th>Name</th>
                     <th>CF Handle</th>
                     <th>Global Rank</th>
                     <th>Current Rating</th>
                     <th>Max Rating</th>
                  </tr>
               </thead>
               <tbody>
                  {
                     participantsInfo.map((participant, clubRank) => <ShowCodeforcesContestIndividualNonParticipantsInfo key={participant._id} clubRank={clubRank + ((page - 1) * 10)} participant={participant}></ShowCodeforcesContestIndividualNonParticipantsInfo>)
                  }
               </tbody>
            </table>
         </div>

         <CustomPagination result={result} handlePagination={handlePagination} perPageItem={perPageItem}></CustomPagination>

      </div >
   );
};

export default CodeforcesIndividualContestResultOfNonParticipants;