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
    lanquage:{
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
        type:Float64Array,
        default:0
    },
    memoryUsage:{
        type:Float64Array,
        default:0
    },
    submittedAt:{
        type:Date,
        default:Date.now
    }

})

export const Solution = mongoose.model("Solution",sol);