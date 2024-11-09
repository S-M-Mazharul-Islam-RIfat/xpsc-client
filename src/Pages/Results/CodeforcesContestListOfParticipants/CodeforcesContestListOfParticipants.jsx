import { Link, useLoaderData } from "react-router-dom";

const CodeforcesContestListOfParticipants = () => {
   const contestData = useLoaderData();
   return (
      <div className="mt-8">
         {
            contestData.map(contest =>
               <div key={contest._id} className="bg-zinc-900 h-20 flex justify-center items-center rounded-lg w-[85%] lg:w-[50%] mx-auto mb-8">
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