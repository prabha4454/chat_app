import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { authRoute } from "../../../../Backend/src/middleware/user.authrote";

export const authStateStore = create((set, get) => ({
  authUser: null,
  userProfile:null,
  isSigningup: false,
  isLoggingIn: false,
  isSigningOut: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,
  onlineUser:[],

  /* connect socket */

  connectSocket: async () => {
    const {authUser} = get();
    console.log(authUser)
 try{

  if(!authUser || get().socket?.connected) return;
           
         
  const socket = io("http://localhost:5000", {

query:{
 userId:authUser.user._id
}
});
socket.connect();
set({ socket:socket });

socket.on("onlineUsers",(users)=>{
set({onlineUser:users});
console.log(get().onlineUser)


})

 }
 catch(error){
  console.log(error)
 }
        

   
  },

  /* disconnect socket */
  disconnectSocket: async () => {
   if(get().socket.connected){
    get().socket.disconnect();
    set({socket:null})
   }
  },

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");

      set({ authUser: response.data });
      set({userProfile:response.data})
      get().connectSocket()
    } catch (error) {
      console.log("Error in checkAuth:", error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  loggingIn: async (path, value) => {
    try {
      const res = await axiosInstance.post(path, value);
      set({ authUser: res.data });
      set({userProfile:res.data})
      get().connectSocket()
      toast.success(res.data.message);
      
    } catch (err) {
      console.log("Error in login", err);
      toast.error(error.message);
    }
  },

  loggingOut: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      toast.success(response.data.message);

      set({ authUser: null });
      get().disconnectSocket()
    } catch (error) {
      console.log("Error in LoggigOut :", error);
      toast.error(error.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  editingProfileDetiail: async (values) =>{
    try{
const response = await axiosInstance.put("/auth/update-userProfileDetail", values);
set({authUser:response.data})
set({userProfile:response.data})
toast.success(response.data.message);
    }
    catch(err){
toast.error(err.message);
    }
  }
}));
