
const SectionTitle = ({ heading }) => {
   return (
      <div className="w-[55%] md:w-[35%] lg:w-[27%] mx-auto text-center my-4">
         <h3 className="text-[1.3rem] md:text-[1.6rem] lg:text-[1.8rem] uppercase border-y-4 py-4">{heading}</h3>
      </div>
   );
};

export default SectionTitle;