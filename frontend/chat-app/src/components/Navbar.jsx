import React from 'react'
import { useState } from 'react';
import { authStateStore } from '../store/authStateStore';
import { chatStateStore } from '../store/chatStateStore';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const {setActiveTab,activeTab} = chatStateStore(); 
    const {loggingOut} = authStateStore();
  return (
   <>
    <div className="flex flex-col-reverse md:flex-row lg:flex-row mx-auto   ">
             <div className="p-1 md:border-r lg:border-r lg:border-gray-700 md: border-gray-700 block  ">
               <nav className={`flex lg:flex-col md:flex-col flex-row w-full md:space-y-4 lg:space-y-4 lg:space-x-0 md:space-x-0 space-x-5 text-white`}>
                
               <button
                  onClick={()=>setActiveTab("profile")}
                
                   className={`p-2 rounded-lg ${
                     activeTab === "profile" ? "bg-gray-800" : ""
                   }`}
                 >
                  <Link to={"/porfile"}>
                  <div className='rounded-full border-green-600 size-7'>
                     
                  <img src="/images/defaultavatar.jpg" className='rounded-full' alt="" />
                  </div>
                  </Link>
                  </button>
               
                 <button
                  onClick={()=>setActiveTab("chat")}
                
                   className={`p-2 rounded-lg ${
                     activeTab === "chat" ? "bg-gray-800" : ""
                   }`}
                 >

              
                   <Link to="/">
                   <svg
                     className="w-6 h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                     />
                   </svg>
                   </Link>
                 </button>
                 <button
                   onClick={() => setActiveTab("settings")}
                   className={`p-2 rounded-lg ${
                     activeTab === "settings" ? "bg-gray-800" : ""
                   }`}
                 >
                  <Link to={"/settings"}>
                   <svg
                     className="w-6 h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                   >
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                     />
                     <path
                       strokeLinecap="round"
                       strokeLinejoin="round"
                       strokeWidth={2}
                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                     />
                   </svg>
                   </Link>
                 </button>
                 <button className="p-2 rounded-lg hover:bg-gray-50 hover:text-red-500" onClick={loggingOut}>
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
                 </button>
               </nav>
             </div>
           </div>
   
   </>
  )
}
