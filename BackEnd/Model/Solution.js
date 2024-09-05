import mongoose from "mongoose";

const sol = new mongoose.Schema({

    problemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Problem'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    language:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'Attempted'
    },
    executionTime:{
        type:Number,
        default:0
    },
    memoryUsage:{
        type:Number,
        default:0
    },
    submittedAt:{
        type:Date,
        default:Date.now
    }

})

export const Solution = mongoose.model("Solution",sol);