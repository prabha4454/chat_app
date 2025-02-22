import {create} from "zustand"
import { axiosInstance } from "../lib/axios"
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"


export const authStateStore = create((set) =>({
    authUser :null,
    isSigningup:false,
    isLoggingIn:false,
    isSigningOut:false,
    isUpdatingProfile:false,

    isCheckingAuth: true,

    checkAuth : async () => {
        try {
            const response = await axiosInstance.get('/auth/check')
      
            set({authUser:response.data})
            } catch (error) {
                console.log("Error in checkAuth:",error)
                }
                finally{
                    set({isCheckingAuth:false});
                }
                },

                loggingIn :async (path,value) =>{
try{
    const res =  await axiosInstance.post(path,value)
    set({authUser:res.data})
    toast.success(res.data.message)
}
catch(err){
    console.log("Error in login",err)
    toast.error(error.message)
}

                },

                loggingOut: async () => {
                    try {
                        const response = await axiosInstance.post('/auth/logout')
                        toast.success(response.data.message)
                  
                        set({authUser:null})
                        } catch (error) {
                            console.log("Error in LoggigOut :",error)
                            toast.error(error.message)
                            }
                            finally{
                                set({isLoggingOut:false});
                            }
                            },    

}))