import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddClubUser = () => {
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
      reset
   } = useForm();

   const onSubmit = async (data) => {
      const imageFile = { image: data.image[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
         headers: {
            'content-type': 'multipart/form-data'
         }
      })
      if (res.data.success) {
         const user = {
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            discordUsername: data.discordUsername,
            codeforcesHandle: data.codeforcesHandle,
            codeforcesCurrentRating: data.codeforcesCurrentRating,
            codeforcesMaxRating: data.codeforcesMaxRating,
            image: res.data.data.display_url
         }
         const userRes = await axiosSecure.post('/clubUsers', user);
         if (userRes.data.insertedId) {
            Swal.fire({
               position: "center",
               icon: "success",
               title: "Club User Added Successfully",
               showConfirmButton: false,
               timer: 1500
            });
            reset();
         }
      }
   }

   return (
      <div>
         <Helmet>
            <title>Add User</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Add Club User"}></SectionTitle>
         </div>
         <div className="w-full md:w-[80%] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">*Name</span>
                  </label>
                  <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full mt-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">*Email</span>
                  </label>
                  <input type="text" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Mobile Number</span>
                     </label>
                     <input type="text" {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Discord Username</span>
                     </label>
                     <input type="text" {...register("discordUsername", { required: true })} placeholder="Discord Username" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Codeforces Current Rating</span>
                     </label>
                     <input type="text" {...register("codeforcesCurrentRating", { required: true })} placeholder="Codeforces Current Rating" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Codeforces Max Rating</span>
                     </label>
                     <input type="text" {...register("codeforcesMaxRating", { required: true })} placeholder="Codeforces Max Rating" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-32 mt-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Codeforces Handle</span>
                     </label>
                     <input type="text" {...register("codeforcesHandle", { required: true })} placeholder="Codeforces Handle" className="input input-bordered w-full" />
                  </div>
                  <div>
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Image</span>
                     </label>
                     <input {...register("image", { required: true })} type="file" className="file-input w-full" />
                  </div>
               </div>
               <button className="btn bg-cyan-600 mt-8">
                  Add User
               </button>
            </form>
         </div>
      </div>
   );
};

export default AddClubUser;