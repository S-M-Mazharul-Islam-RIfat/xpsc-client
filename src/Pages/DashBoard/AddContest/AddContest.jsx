import { useForm } from "react-hook-form";

import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AddContest = () => {
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors }
   } = useForm()

   const onSubmit = async (data) => {
      const contest = {
         contestId: parseInt(data.contestId),
         contestName: data.contestName,
         contestDate: data.contestDate,
         contestDuration: data.contestDuration,
         contestStartTime: data.contestStartTime,
         contestEndTime: data.contestEndTime
      }
      const newContest = await axiosSecure.post('/codeforcesContestList', contest);
      if (newContest.data.insertedId) {
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Contest Added Successfully",
            showConfirmButton: false,
            timer: 1500
         });
         reset();
      }
   }

   return (
      <div>
         <Helmet>
            <title>Add Contest</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Add Contest"}></SectionTitle>
         </div>
         <div className="w-full md:w-[80%] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">*Contest Id</span>
                  </label>
                  <input type="text" {...register("contestId", { required: true })} placeholder="Contest Id" className="input input-bordered w-full" />
                  {errors.contestId && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest id</span>}
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">*Contest Name</span>
                  </label>
                  <input type="text" {...register("contestName", { required: true })} placeholder="Contest Name" className="input input-bordered w-full" />
                  {errors.contestName && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest name</span>}
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Contest Date</span>
                     </label>
                     <input type="date" {...register("contestDate", { required: true })} placeholder="Contest Date" className="input input-bordered w-full" />
                     {errors.contestDate && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest date</span>}
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Contest Duration</span>
                     </label>
                     <input type="text" {...register("contestDuration", { required: true })} placeholder="Contest Duration" className="input input-bordered w-full" />
                     {errors.contestDuration && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest duration</span>}
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Contest Start Time</span>
                     </label>
                     <input type="text" {...register("contestStartTime", { required: true })} placeholder="Contest Start Time" className="input input-bordered w-full" />
                     {errors.contestStartTime && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest start time</span>}
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Contest End Time</span>
                     </label>
                     <input type="text" {...register("contestEndTime", { required: true })} placeholder="Contest End Time" className="input input-bordered w-full" />
                     {errors.contestEndTime && <span className="text-red-500 text-[0.9rem] mt-[4px]">Enter the contest end time</span>}
                  </div>
               </div>
               <button className="btn mt-8 bg-cyan-600">
                  Add Contest
               </button>
            </form>
         </div>
      </div>
   );
};

export default AddContest;