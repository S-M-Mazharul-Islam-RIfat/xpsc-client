import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
   const { googleSignIn, signIn } = useAuth();
   const axiosPublic = useAxiosPublic();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || '/';

   const {
      register,
      handleSubmit,
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
                  title: "Login Successfully",
                  showConfirmButton: false,
                  timer: 1500
               });
               navigate(from, { replace: true });
            })
      }
      else {
         Swal.fire({
            position: "top-end",
            icon: "error",
            title: "User Doesnt Exist",
            showConfirmButton: false,
            timer: 1500
         });
      }
   }

   return (
      <>
         <Helmet>
            <title>Login</title>
         </Helmet>

         <div className="w-[85%] mx-auto shadow-2xl">
            <div className="max-w-md mx-auto bg-[#04101B] p-8 mt-20 rounded-lg">
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Email</span>
                     </label>
                     <input type="email" {...register("email")} placeholder="Email" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A]" required />
                  </div>
                  <div className="form-control">
                     <label className="label">
                        <span className="label-text">Password</span>
                     </label>
                     <input type="password"  {...register("password")} placeholder="Password" className="input input-bordered h-[2.5rem] rounded-lg bg-[#05070A]" required />
                     <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                     </label>
                  </div>
                  <div className="form-control mt-6">
                     <button className="btn bg-[#F3F5F9] text-[black] hover:bg-slate-200 rounded-lg">Login</button>
                  </div>
                  <div className="mt-4 text-center">
                     <p>Dont have an account? <Link to="/signup"><span className="hover:underline">Sign Up</span></Link> </p>
                  </div>
                  <div>
                     <p className="text-center mt-2">or</p>
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
      </>
   );
};

export default Login;