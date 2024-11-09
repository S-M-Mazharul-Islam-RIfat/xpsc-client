import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ExportData = () => {
   return (
      <div>
         <Helmet>
            <title>Export Data</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Export Data"}></SectionTitle>
         </div>
      </div>
   );
};

export default ExportData;