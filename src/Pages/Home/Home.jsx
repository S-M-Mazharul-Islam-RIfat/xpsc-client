import { Helmet } from "react-helmet-async";

const Home = () => {
   return (
      <div>
         <Helmet>
            <title>Home</title>
         </Helmet>
         <h1 className="text-5xl text-center pt-40 text-cyan-500">XPSC Monitoring System</h1>
      </div>
   );
};

export default Home;