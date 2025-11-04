import {createContext, useContext, useState,useEffect } from "react"
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () =>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth is under the AuthProvider')      
    }
    return context;
};

export const AuthProvider = ({children})=>{
 
     const [user,setUser] = useState(null);
     const [isAdmin,setIsAdmin] = useState(false);

      useEffect(()=>{
         const savedUser = Cookies.get('user')
         const savedUserType = Cookies.get('userType')
         if(savedUser){
            setUser(JSON.parse(savedUser))
            setIsAdmin(savedUserType === "admin")
         }
      },[])
     const login = (userData,userType)=>{
        setUser(userData);
        setIsAdmin(userType==="admin")
        Cookies.set('user',JSON.stringify(userData),{expires:7});
        Cookies.set('userType',userType,{expires:7});
     };
 
     const logout =()=>{
        setUser(null)
        setIsAdmin(false)
        Cookies.remove('user')
        Cookies.remove('userType')
     }
     const value ={
        user,
        isAdmin,
        login,
        logout
     }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}