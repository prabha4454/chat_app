import { create } from "zustand";
import { Contacts } from "../components/Contacts";
import { axiosInstance } from "../lib/axios";
import { authStateStore } from "./authStateStore";
import toast from "react-hot-toast";



export const chatStateStore = create((set, get) => ({
  isLoadingContacts: false,
  isLoadingMessages: false,
  contacts: [],
  Error: null,
  selectedContact: null,
  messages: [],
rightStyle:"hidden",
leftStyle:"block",
activeTab:"chat",

setActiveTab: async (tab)=>{

  set({activeTab:tab})
  set({rightStyle:"hidden"})
    set({leftStyle:"block"})
  
},
  //to get users list from server
  fetchContacts: async () => {
    try {
      

      set({ isLoadingContacts: true });
      const userRes = await axiosInstance.get("/message/users");
      set({ contacts: userRes.data });
    } catch (err) {
      set({ Error: err.message });
    } finally {
      set({ isLoadingContacts: false});
    }
  },

  //to get messages  from server
  fecthMessages: async (contact) => {
    if(get().rightStyle === "hidden") {
      set({rightStyle:"flex"})
            } 
            if(get().leftStyle === "block"){
              set({leftStyle:"hidden"})
            }
    try {
      set({ isLoadingMessages: true });
      set({ selectedContact: contact });
      const res = await axiosInstance.get(`/message/${contact._id}`);
      set({ messages: res.data });
      console.log(res.data)
    } catch (err) {
      set({ Error: err.message });
    } finally {
      set({ isLoadingMessages: false });
    }
  },
  //for sending message 

  sendMessage: async (values) => {

    try{
      const message = await axiosInstance.post(
        `/message/send/${get().selectedContact._id}`,
        values
      );
    
    /*  const newMessage= socket.on("newMessage" ,newMessage) */
     
     if(newMessage){
      set({messages:[...get().messages , newMessage]})
      
    }
    toast.success("message send succesfully")
    }
catch(error){
  console.log("Error in sending message at chatStateState:",error.message)
  toast.error(error.message)
}
 

},




}));

