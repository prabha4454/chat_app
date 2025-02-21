import mongoose from "mongoose";


/* this for user schema in database */
const userSchema = new mongoose.Schema(

    {
        fullName:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            required:true,
            unique:true  //to check the email
        },
        password:{
            type:String,
            required:true
        },
        profilePic:{
            type:String,
            default:'',
        },


    },
    {
        timestamps:true
    }
);

const User = mongoose.model('User', userSchema);

export default User;
