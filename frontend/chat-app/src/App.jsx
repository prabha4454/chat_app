
import './App.css'
import { Routes ,Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import {Signup} from './pages/Signup'
import {Login} from './pages/Login'
import { ProfilePage } from './pages/ProfilePage'
import {SettingPage} from './pages/SettingPage'
import { useEffect } from 'react'
import { authStateStore } from './store/authStateStore'
import {Loader} from "lucide-react"



function App() {

  const {authUser, checkAuth , isCheckingAuth} = authStateStore()

  useEffect(()=>{
    checkAuth()
  },[])

  console.log(authUser);

  if(isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="sixe-10 animate-spin" />
    </div>
  )
  

  return (
    <>
   

<Routes>
  <Route path="/" element={ authUser? <Home /> : <Login /> } />
  <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login/>} />
  <Route path="/settings" element={<SettingPage/>} />
  <Route path="/porfile" element={<ProfilePage/>} />
  <Route path="/" element={<Home />} />
</Routes>
    
    
    </>
  )
}

export default App
