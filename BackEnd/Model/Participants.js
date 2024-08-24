import mongoose from "mongoose";

const parti = new mongoose.Schema({

    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    challengeID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Challenge'
    },
    status:{
        type:String,
        default:'ready'
    },
    score:{
        type:Number,
        default:0
    }

})

export const Participant = mongoose.model("Participant",parti);