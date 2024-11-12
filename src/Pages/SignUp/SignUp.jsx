import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const SignUp = () => {
   const { googleSignIn, createUser } = useAuth();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   };

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm()


   const onSubmit = async (data) => {
      const newUserName = data.name, newUserEmail = data.email, newUserPassword = data.password;
      const newUser = {
         name: newUserName,
         email: newUserEmail,
         role: "user"
      }
      const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUserEmail}`);
      if (userAlreadyExist.data) {
         Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User Already Exist",
            showConfirmButton: false,
            timer: 1500
         });
      }
      else {
         createUser(newUserEmail, newUserPassword)
            .then(async (res) => {
               const result = await axiosPublic.post('/allUsers', newUser);
               if (result.data.insertedId) {
                  Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: "Sign Up Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  reset();
                  navigate(from, { replace: true });
               }
            })
      }
   }

   const handleGoogleSignUp = () => {
      googleSignIn()
         .then(async (res) => {
            const newUser = {
               name: res.user.displayName,
               email: res.user.email,
               role: "user"
            }
            const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUser.email}`);
            if (userAlreadyExist) {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate(from, { replace: true });
            }
            else {
               const result = await axiosPublic.post('/allUsers', newUser);
               if (result.data.insertedId) {
                  Swal.fire({
                     position: "top-end",
                     icon: "success",
                     title: "Sign Up Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  navigate(from, { replace: true });
               }
            }
         })
   }

   return (
      <div>
         <Helmet>
            <title>Sign Up</title>
         </Helmet>
         <div className="w-[95%] mx-auto shadow-2xl">
            <div className="max-w-md mx-auto bg-[#04101B] p-8 mt-6 md:mt-10 lg:mt-16 rounded-lg">
               <div className="text-[2.5rem] mb-3 font-semibold">Sign up</div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Name</span>
                     </label>
                     <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A] mb-2" />
                     {errors.name && <span className="text-red-500 text-[0.9rem]">Name is required</span>}
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A] mb-2" />
                     {errors.email && <span className="text-red-500 text-[0.9rem]">Email is required</span>}
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <div className="relative">
                        <input type={showPassword ? 'text' : 'password'}  {...register("password", {
                           required: true,
                           minLength: 6,
                           maxLength: 20,
                           pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        })} placeholder="Password" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A] w-full mb-2" required />
                        {errors.password?.type === 'required' && <p className="text-red-500 text-[0.9rem]">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-500 text-[0.9rem]">Password must be at least 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-500 text-[0.9rem]">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-500 text-[0.9rem]">Password must have atleast one uppercase one lowercase, one number and one special character</p>}
                        <button
                           type="button"
                           onClick={togglePasswordVisibility}
                           className="absolute right-2 top-3"
                        >
                           {showPassword ? (
                              <IoMdEyeOff />
                           ) : (
                              <IoMdEye />
                           )}
                        </button>
                     </div>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-[#F3F5F9] text-[black] hover:bg-slate-200 rounded-lg">Sign Up</button>
                  </div>
                  <div className="mt-4 text-center">
                     <p>Already have an account? <Link to="/login"><span className="hover:underline">Login</span></Link> </p>
                  </div>
                  <div>
                     <div className="divider">or</div>
                  </div>
                  <div className="form-control mt-4">
                     <div onClick={handleGoogleSignUp} className="btn bg-[#05070A] text-[white] hover:bg-[#000000] rounded-lg">
                        <FcGoogle />
                        Sign In With Google
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SignUp;