import mongoose from "mongoose";
import { Notification } from "./Notification.js";

const user = new mongoose.Schema({

    uname:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        default:"Male"
    },
    bio:{
        type:String,
        default:""
    },
    profilePic:{
        type:String,
        default:""
    },
    notifications:[
        Notification
    ]

})

export const User = mongoose.model("User",user);