
import './App.css'
import { Routes ,Route, Navigate } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import {Signup} from './pages/Signup'
import {Login} from './pages/Login'
import { ProfilePage } from './pages/ProfilePage'
import {SettingPage} from './pages/SettingPage'
import { useEffect } from 'react'
import { authStateStore } from './store/authStateStore'
import {Loader} from "lucide-react"
import { Toaster } from "react-hot-toast"



function App() {

  const {authUser, checkAuth , isCheckingAuth} = authStateStore()

  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log(authUser);

  if(isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="sixe-10 animate-spin" />
    </div>
  )
  

  return (
    <>
   

<Routes>
  <Route path="/" element={ authUser? <Home /> :<Navigate to="/login"/> } />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={!authUser?<Login/>: <Navigate to="/"/>} />
  <Route path="/settings" element={authUser?<SettingPage/> :<Navigate to="/login"/> } />
  <Route path="/porfile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>} />
  <Route path="/" element={<Home />} />
</Routes>
<Toaster/>
    
    
    </>
  )
}

export default App
