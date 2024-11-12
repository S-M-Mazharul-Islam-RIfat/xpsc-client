import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import Loader from "../../Shared/Loader/Loader";

const CodeforcesContestListOfParticipants = () => {
   const contestData = useLoaderData();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      setLoading(false);
   }, [contestData])

   return (
      <div className="mt-8">
         <Helmet>
            <title>Codeforces Contest List</title>
         </Helmet>
         {
            loading ?
               <Loader></Loader>
               :
               contestData.map(contest =>
                  <div key={contest._id} className="bg-zinc-900 h-20 flex justify-center items-center rounded-lg w-[95%] lg:w-[50%] mx-auto mb-8">
                     <Link to={`/resultTypes/codeforcesContestListOfParticipants/${parseInt(contest.contestId)}`} >
                        <h2 className="text-[1.1rem] md:text-[1.2rem] lg:text-[1.4rem] font-bold">{contest.contestName}</h2>
                     </Link>
                  </div>
               )
         }
      </div>
   );
};

export default CodeforcesContestListOfParticipants;