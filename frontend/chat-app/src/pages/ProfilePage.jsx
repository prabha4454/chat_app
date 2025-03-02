import React from "react";
import { TbCameraPlus } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";
import { authStateStore } from "../store/authStateStore";
import { format } from 'date-fns';
import Editprofile from "../components/Editprofile";
import { AddPic } from "../components/AddPic";
import { profileStateStore } from "../store/profileStateStore";
import { useEffect } from "react";

export const ProfilePage = () => {
  const {userProfile} = authStateStore();
  const {profilePic , getUserProfilePic ,isLoadingProfilePic} = profileStateStore();

  useEffect(()=>{
    getUserProfilePic()
  },[getUserProfilePic,profilePic,userProfile])
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 py-8 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
   <div className="flex justify-self-end">
   <div className=" text-blue-600 flex items-center font-medium hover:cursor-pointer" onClick={()=>document.getElementById('edit-profile-details').showModal()}>
    <Editprofile />
    <FaUserEdit className="size-4.5" /> Edit
   </div>
   </div>
   
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src={profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full border-3 border-gray-300"
            />
            <div className="absolute bottom-3 right-3 w-9 h-9    rounded-full border-2 border-gray-400 hover:cursor-pointer bg-gray-800 opacity-40 pt-0.5 "
            onClick={()=>document.getElementById('edit-profile-pic').showModal()}>
              <AddPic />
                 <TbCameraPlus className="size-7 mx-auto  text-gray-100 " />
            </div>
          </div>
          <h2 className="text-xl font-bold text-green-600  mt-4">{userProfile.fullName}</h2>
          {/* <p className="text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Online
          </p> */}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-500 dark:text-gray-300 text-sm">Bio:</label>
            <p className="text-gray-800 dark:text-gray-500 mt-1">
             {userProfile.bio}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 dark:text-gray-300 text-sm">User Id:</label>
              <p className="text-gray-800  dark:text-gray-500  mt-1">{userProfile.email}</p>
            </div>
           {/*  <div>
              <label className="text-gray-500 text-sm">Phone</label>
              <p className="text-gray-800 mt-1">+1 234 567 890</p>
            </div> */}
          </div>

          <div>
            <label className="text-gray-500  dark:text-gray-300 text-sm">Member Since:</label>
            <p className="text-gray-800  dark:text-gray-500  mt-1">{format(userProfile.createdAt, 'dd/mm/yyyy')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-4">
          {/*  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Edit Profile
          </button> */}
          {/* <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200">
            Logout
          </button> */}
        </div>
      </div>
    </div>
  );
};
