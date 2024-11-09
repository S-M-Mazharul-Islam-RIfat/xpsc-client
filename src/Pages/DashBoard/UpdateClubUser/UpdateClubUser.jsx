import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateClubUser = () => {
   const { _id, name, email, mobileNumber, discordUsername, codeforcesHandle, codeforcesCurrentRating, codeforcesMaxRating, image } = useLoaderData();
   const axiosPublic = useAxiosPublic();
   const axiosSecure = useAxiosSecure();

   const {
      register,
      handleSubmit,
   } = useForm()


   const onSubmit = async (data) => {
      let imageURL = image
      if (data.image[0]) {
         const imageFile = { image: data.image[0] };
         const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
               'content-type': 'multipart/form-data'
            }
         })
         imageURL = res.data.data.display_url;
      }

      const updatedClubUser = {
         name: data.name,
         email: data.email,
         mobileNumber: data.mobileNumber,
         discordUsername: data.discordUsername,
         codeforcesHandle: data.codeforcesHandle,
         codeforcesCurrentRating: data.codeforcesCurrentRating,
         codeforcesMaxRating: data.codeforcesMaxRating,
         image: imageURL
      }

      const updatedUserRes = await axiosSecure.patch(`/clubUsers/${_id}`, updatedClubUser);

      if (updatedUserRes.data.modifiedCount) {
         Swal.fire({
            position: "center",
            icon: "success",
            title: "Club User Updated Successfully",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <div>
         <Helmet>
            <title>Update User</title>
         </Helmet>
         <div>
            <SectionTitle heading={"Update Club User"}></SectionTitle>
         </div>
         <div className="w-[80%] mx-auto">
            <form onSubmit={handleSubmit(onSubmit)}>
               <div className="form-control w-full my-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">Name</span>
                  </label>
                  <input defaultValue={name} type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered w-full" />
               </div>
               <div className="form-control w-full my-6">
                  <label className="label">
                     <span className="label-text text-[#ffffff] font-semibold">Email</span>
                  </label>
                  <input defaultValue={email} type="text" {...register("email", { required: true })} placeholder="Email" className="input input-bordered w-full" />
               </div>
               <div className="grid grid-cols-2 gap-32 my-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Mobile Number</span>
                     </label>
                     <input defaultValue={mobileNumber} type="text" {...register("mobileNumber", { required: true })} placeholder="Mobile Number" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">*Discord Username</span>
                     </label>
                     <input defaultValue={discordUsername} type="text" {...register("discordUsername", { required: true })} placeholder="Discord Username" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-32 my-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Codeforces Current Rating</span>
                     </label>
                     <input defaultValue={codeforcesCurrentRating} type="text" {...register("codeforcesCurrentRating", { required: true })} placeholder="Codeforces Current Rating" className="input input-bordered w-full" />
                  </div>
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Codeforces Max Rating</span>
                     </label>
                     <input defaultValue={codeforcesMaxRating} type="text" {...register("codeforcesMaxRating", { required: true })} placeholder="Codeforces Max Rating" className="input input-bordered w-full" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-32 my-6">
                  <div className="form-control w-full">
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Codeforces Handle</span>
                     </label>
                     <input defaultValue={codeforcesHandle} type="text" {...register("codeforcesHandle", { required: true })} placeholder="Codeforces Handle" className="input input-bordered w-full" />
                  </div>
                  <div>
                     <label className="label">
                        <span className="label-text text-[#ffffff] font-semibold">Image</span>
                     </label>
                     <input {...register("image")} type="file" className="file-input w-full" />
                  </div>
               </div>
               <button className="btn my-y bg-cyan-600 my-8">
                  Update User
               </button>
            </form>
         </div>
      </div>
   );
};

export default UpdateClubUser;