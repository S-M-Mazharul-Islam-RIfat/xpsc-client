import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const UpdateContest = () => {
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
   } = useForm()

   const { _id, contestId, contestName, contestDate, contestStartTime, contestEndTime, contestDuration } = useLoaderData();

   const onSubmit = async (singleContest) => {
      const updatedContest = {
         contestId: parseInt(singleContest.contestId),
         contestName: singleContest.contestName,
         contestDate: singleContest.contestDate,
         contestStartTime: singleContest.contestStartTime,
         contestEndTime: singleContest.contestEndTime,
         contestDuration: singleContest.contestDuration
      }
      const res = await axiosSecure.patch(`/codeforcesContestList/${_id}`, updatedContest);
      if (res.data.modifiedCount) {
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Contest Updated Successfully",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <div>
         <Helmet>
            <title>Dashboard | Update Contest</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Update Contest"}></SectionTitle>
         </div>
         <div className="w-full md:w-[85%] mx-auto mt-8">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">Contest Id</span>
                  </label>
                  <input defaultValue={contestId} type="text" {...register("contestId", { required: true })} placeholder="Contest Id" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">Contest Name</span>
                  </label>
                  <input defaultValue={contestName} type="text" {...register("contestName", { required: true })} placeholder="Contest Name" className="input input-bordered w-full" />
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Contest Date</span>
                     </label>
                     <input defaultValue={contestDate} type="date" {...register("contestDate", { required: true })} placeholder="Contest Date" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full mt-6 lg:mt-0">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Contest Duration</span>
                     </label>
                     <input defaultValue={contestDuration} type="text" {...register("contestDuration", { required: true })} placeholder="Contest Duration" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Contest Start Time</span>
                     </label>
                     <input defaultValue={contestStartTime} type="text" {...register("contestStartTime", { required: true })} placeholder="Contest Start Time" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full mt-6 lg:mt-0">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Contest End Time</span>
                     </label>
                     <input defaultValue={contestEndTime} type="text" {...register("contestEndTime", { required: true })} placeholder="Contest End Time" className="input input-bordered w-full" />
                  </div>
               </div>
               <button className="btn mt-7 bg-cyan-600">
                  Update Contest
               </button>
            </form>
         </div>
      </div>
   );
};

export default UpdateContest;