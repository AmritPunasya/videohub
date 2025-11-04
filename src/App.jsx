
import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Navbar } from "./components/navbar"
import { AuthProvider } from "./context/AuthContext"
import { Login } from "./pages/user/Login"
import { Home } from "./pages/user/Home"
import {AdminPanel} from "./pages/admin/AdminPanel"
import { useEffect } from "react"
import { testSupabaseConnection } from "./utils/testSupabase"
import { Dashboard } from "./pages/user/Dashboard"
import Category from "./pages/user/Category"
import {Profile} from "./pages/user/Profile"
import {Register} from "./pages/user/Register"
import {ProtectedRoute} from "./components/ProtectedRoute";
export function App(){
    useEffect(()=>{
        testSupabaseConnection();
    },[])
    return(
        <BrowserRouter>
        <AuthProvider>
           <Navbar/>
           <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin"
              element={
                <ProtectedRoute>
                    <AdminPanel/>
              </ProtectedRoute>}/>
            <Route path="/dashboard" 
               element={
                <ProtectedRoute>
               <Dashboard/>
               </ProtectedRoute>
               }/>
            <Route path="/category" 
               element={
                <ProtectedRoute>
               <Category/>
                 </ProtectedRoute>
               }/>
            <Route path="/profile" 
               element={
                <ProtectedRoute>
                  <Profile/>
               </ProtectedRoute>
                }/>
           </Routes>
           </AuthProvider>
        </BrowserRouter>
    )
}