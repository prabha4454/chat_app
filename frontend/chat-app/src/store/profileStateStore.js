import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import Editprofile from "../components/Editprofile";
import { isValid } from "date-fns";

export const profileStateStore = create((set) => ({
  profilePic: "/images/defaultavatar.jpg",
  isLoadingProfilePic: false,


  //for adding and edditing user profile picture

  editProfilePic: async (values) => {
    if (!values) {
      return toast.error("please enter some message");
    }
    try {
      set({ isLoadingProfilePic: true });
      const res = await axiosInstance.put("/auth/update-userProfilePic", values,{   headers: { 'Content-Type': 'multipart/form-data' }});
      set({ profilePic: res.data.updatedUser.profilePic });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.message);
      set({ isLoadingProfilePic: false });
    } finally {
      set({ isLoadingProfilePic: false });
    }
  },
}));
