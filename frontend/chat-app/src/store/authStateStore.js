import {create} from "zustand"
import { axiosInstance } from "../lib/axios"


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

                

}))