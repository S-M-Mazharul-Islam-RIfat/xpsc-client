import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, deleteUser, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import useAxiosPublic from './../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true);
   const googleProvider = new GoogleAuthProvider();
   const axiosPublic = useAxiosPublic();


   const createUser = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   }

   const signIn = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   }

   const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   }

   const logOut = () => {
      setLoading(true);
      return signOut(auth);
   }

   const removeUser = () => {
      setLoading(true);
      return deleteUser(user);
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         setUser(currentUser);
         if (currentUser) {
            const newUser = { email: currentUser.email }
            axiosPublic.post('/jwt', newUser, { withCredentials: true })
               .then(res => {

               })
         }
         setLoading(false);
      })
      return () => {
         return unsubscribe();
      }
   }, [axiosPublic])

   const authInfo = {
      user,
      loading,
      createUser,
      signIn,
      googleSignIn,
      logOut,
      removeUser
   }
   return (
      <AuthContext.Provider value={authInfo}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthProvider;