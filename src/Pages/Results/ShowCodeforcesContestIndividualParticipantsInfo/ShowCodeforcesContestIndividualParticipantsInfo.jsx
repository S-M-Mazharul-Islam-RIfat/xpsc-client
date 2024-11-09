import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShowCodeforcesContestIndividualParticipantsInfo = ({ participant, clubRank }) => {
   const { name, userName, globalStandings, currentRating, maxRating, ratingChanges, solveCount, solveProblems } = participant;
   const [rankColor, setRankColor] = useState("text-[#CCCCCC]");

   useEffect(() => {
      if (maxRating >= 1400) {
         setRankColor("text-[#77DDBB]");
      }
      else if (maxRating >= 1200) {
         setRankColor("text-[#77FF77]");
      }
   }, [maxRating])

   return (
      <>
         <tr className="hover leading-2">
            <td className="text-center">{clubRank + 1}</td>
            <td className="text-nowrap">{name}</td>
            <Link to={`https://codeforces.com/profile/${userName}`}><td className={rankColor}>{userName}</td></Link>
            <td className="text-center">{solveCount}</td>
            <td className="text-center">{
               solveProblems.map(problem => problem + " ")
            }</td>
            <td className="text-center">{globalStandings}</td>
            <td className="text-center">{currentRating}</td>
            <td className="text-center">{maxRating}</td>
            <td className="text-center">{ratingChanges}</td>
         </tr>
      </>
   );
};

export default ShowCodeforcesContestIndividualParticipantsInfo;