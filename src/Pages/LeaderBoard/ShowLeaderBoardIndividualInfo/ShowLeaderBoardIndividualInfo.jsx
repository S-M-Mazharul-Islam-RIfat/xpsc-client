import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const ShowLeaderBoardIndividualInfo = ({ clubUser, clubRank }) => {
   const { image, name, codeforcesHandle, codeforcesCurrentRating, codeforcesMaxRating } = clubUser;
   const [rankColor, setRankColor] = useState("text-[#CCCCCC]");

   useEffect(() => {
      if (codeforcesMaxRating >= 1400) {
         setRankColor("text-[#77DDBB]");
      }
      else if (codeforcesMaxRating >= 1200) {
         setRankColor("text-[#77FF77]");
      }
   }, [codeforcesMaxRating])

   return (
      <>
         <tr className="hover">
            <td className="text-center">{clubRank + 1}</td>
            <td className="text-nowrap">
               <div className="avatar">
                  <div className="w-8 rounded-full">
                     <img src={image} />
                  </div>
               </div>
            </td>
            <td className="text-nowrap">{name}</td>
            <Link to={`https://codeforces.com/profile/${codeforcesHandle}`}><td className={rankColor}>{codeforcesHandle}</td></Link>
            <td className="text-center">{codeforcesCurrentRating}</td>
            <td className="text-center">{codeforcesMaxRating}</td>
         </tr>
      </>
   );
};

export default ShowLeaderBoardIndividualInfo;