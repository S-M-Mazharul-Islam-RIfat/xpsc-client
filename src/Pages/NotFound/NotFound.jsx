import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const NotFound = () => {
   return (
      <div>
         <Helmet>
            <title>Page not found</title>
         </Helmet>
         <div className="w-[95%] mx-auto flex flex-col justify-center items-center">
            <h2 className="text-3xl lg:text-4xl mt-32 mb-10">OOOPS!!! Page Not Found</h2>
            <Link to='/'><button className="btn btn-outline">Back To Home Page</button></Link>
         </div>
      </div>
   );
};

export default NotFound;