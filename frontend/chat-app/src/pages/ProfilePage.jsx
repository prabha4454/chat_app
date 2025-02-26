import React from "react";
import { TbCameraPlus } from "react-icons/tb";
import { FaUserEdit } from "react-icons/fa";

export const ProfilePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
   <div className="flex justify-self-end">
   <button className=" text-blue-600 flex items-center font-medium hover:cursor-pointer">
    <FaUserEdit className="size-5" />Edit
   </button>
   </div>
   
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <img
              src="/images/defaultavatar.jpg"
              alt="Profile"
              className="w-32 h-32 rounded-full border-3 border-gray-300"
            />
            <div className="absolute bottom-3 right-3 w-9 h-9 bg-transparent text-black  rounded-full border-2 border-transparent hover:cursor-pointer">
              <TbCameraPlus className="size-8 text-blue-300 " />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-green-500  mt-4">John Doe</h2>
          {/* <p className="text-gray-600 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Online
          </p> */}
        </div>

        {/* Profile Details */}
        <div className="space-y-4">
          <div>
            <label className="text-gray-500 text-sm">Bio</label>
            <p className="text-gray-800 mt-1">
              Frontend Developer | React enthusiast | Coffee lover
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <p className="text-gray-800 mt-1">john.doe@example.com</p>
            </div>
           {/*  <div>
              <label className="text-gray-500 text-sm">Phone</label>
              <p className="text-gray-800 mt-1">+1 234 567 890</p>
            </div> */}
          </div>

          <div>
            <label className="text-gray-500 text-sm">Joined</label>
            <p className="text-gray-800 mt-1">January 2023</p>
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
