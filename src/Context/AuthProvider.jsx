import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../Firebase/Firebase.config";
import { useEffect, useState } from "react";
import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
     const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const createUser = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    const loginUser = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const updateUser = (obj) => {
        setLoading(true)
        return updateProfile(auth.currentUser,obj)
    }
    const googleSignIn = ()=>{
        setLoading(true)
        return signInWithPopup(auth,provider)
    }
    const logOut = () => {
        setLoading(true)
       return signOut(auth)
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser => {
            setUser(currentUser);
            setLoading(false);
        })
        return ()=>unsubscribe()
    },[])
    const authInfo = {
        createUser,
        loginUser,
        googleSignIn,
        updateUser,
        logOut,
        setLoading,
        setTheme,
        user,
        loading,
        theme,
    }
   return (
    <AuthContext value={authInfo}>
        {children}
    </AuthContext>
   )
};

export default AuthProvider;