import mongoose from "mongoose";

const noti = new mongoose.Schema({
    msg:{
        type:String,
        default:"Welcome to Our Application.Unleash Your True power.Thank you for Join with us. Happy Coding ^_^"
    },
    date:{
        type:Date,
        default:Date.now
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    seen:{
        type:Boolean,
        default:false
    }
})

export const Notification = mongoose.model("Notification",noti);