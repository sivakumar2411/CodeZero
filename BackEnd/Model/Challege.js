import mongoose from "mongoose";

const chal = new mongoose.Schema({

    HostID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    status:{
        type:String,
        default:"Not Started"
    },
    type:{
        type:String,
        required:true
    },
    timeduration:{
        type:Number,
        required:true
    },
    problemSet:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Problem'
        }
    ]


})

export const Challenge = mongoose.model("Challenge",chal);