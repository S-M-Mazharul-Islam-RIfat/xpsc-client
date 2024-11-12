import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const Login = () => {
   const { googleSignIn, signIn } = useAuth();
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
      formState: { errors },
   } = useForm()


   const handelGoogleSignIn = () => {
      googleSignIn()
         .then(async (res) => {
            const newUser = {
               name: res.user.displayName,
               email: res.user.email,
               role: "user"
            }
            const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUser.email}`);
            if (userAlreadyExist.data) {
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
                     title: "Login Successfully",
                     showConfirmButton: false,
                     timer: 1500
                  });
                  navigate(from, { replace: true });
               }
            }
         })
   }

   const onSubmit = async (data) => {
      const newUserEmail = data.email, newUserPassword = data.password;
      const userAlreadyExist = await axiosPublic.get(`/allUsers/${newUserEmail}`);
      if (userAlreadyExist.data) {
         signIn(newUserEmail, newUserPassword)
            .then(res => {
               Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Login successfully",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate(from, { replace: true });
            })
            .catch((error) => {
               Swal.fire({
                  position: "top-end",
                  icon: "error",
                  title: "User doesn’t exist, please enter the email and password correctly",
                  showConfirmButton: false,
                  timer: 2000
               });
            });
      }
      else {
         Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User doesn’t exist, please sign up",
            showConfirmButton: false,
            timer: 2000
         });
      }
   }

   return (
      <div>
         <Helmet>
            <title>Log in</title>
         </Helmet>
         <div className="w-[95%] mx-auto shadow-2xl">
            <div className="max-w-md mx-auto bg-[#04101B] p-8 mt-12 md:mt-14 lg:mt-20 rounded-lg">
               <div className="text-[2.5rem] mb-3 font-semibold">Log in</div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" {...register("email", { required: true })} placeholder="Email" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A]" required />
                     {errors.email && <span className="text-red-500 text-[0.9rem]">Email is required</span>}
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <div className="relative">
                        <input type={showPassword ? 'text' : 'password'}  {...register("password", { required: true })} placeholder="Password" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A] w-full mb-2" />
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
                        {errors.password && <span className="text-red-600 text-[0.9rem]">Password is required</span>}
                     </div>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-[#F3F5F9] text-[black] hover:bg-slate-200 rounded-lg">Log in</button>
                  </div>
                  <div className="mt-4 text-center">
                     <p>Don’t have an account? <Link to="/signup"><span className="hover:underline">Sign Up</span></Link> </p>
                  </div>
                  <div>
                     <div className="divider">or</div>
                  </div>
                  <div className="form-control mt-4">
                     <div onClick={handelGoogleSignIn} className="btn bg-[#05070A] text-[white] hover:bg-[#000000] rounded-lg">
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

export default Login;