import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const ResultTypes = () => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 mt-8 gap-8 w-[95%] lg:w-[80%] mx-auto">
         <Helmet>
            <title>Result</title>
         </Helmet>
         <div className="bg-zinc-900 h-20 flex justify-center items-center rounded-lg w-full mx-auto">
            <Link to="/resultTypes/codeforcesContestListOfParticipants"><h2 className="text-[1rem] lg:text-[1.3rem] font-bold">Codeforces Participants Results</h2></Link>
         </div>
         <div className="bg-zinc-900 h-20 flex justify-center items-center rounded-lg w-full mx-auto">
            <Link to="/resultTypes/codeforcesContestListOfNonParticipants"><h2 className="text-[1rem] lg:text-[1.3rem] font-bold">Codeforces Non Participants Results</h2></Link>
         </div>
      </div>
   );
};

export default ResultTypes;