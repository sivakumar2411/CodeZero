import mongoose from "mongoose";

const user = new mongoose.Schema({

    uname:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        required:true,
        default:""
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
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Notification'
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    admin:{
        type:Boolean,
        default:false
    }

})

export const User = mongoose.model("User",user);