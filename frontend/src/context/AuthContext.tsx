import { onAuthStateChanged, type User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
type AuthContextType = {
  user: User | null;
  loading: boolean;
};
type Props={
    children:React.ReactNode ;
}
export  const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth=()=>(useContext(AuthContext))
export function AuthProvider({ children }:Props){
    
    const [user,setUser]=useState<User |null>(null)
    const [loading,setLoading]=useState<boolean>(true)
    
    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,(firebaseUser)=>{
            setUser(firebaseUser)
            setLoading(false)
        })
        return unsubscribe
    }
    ,[])
    return(
        <AuthContext.Provider value={{user,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
