import mongoose from "mongoose";

const problem = new mongoose.Schema({

    problemNo:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        required:true
    },
    inputformat:{
        type:String,
        required:true
    },
    outputformat:{
        type:String,
        required:true
    },
    constraints:{
        type:String,
        required:true
    },
    sampleinput:{
        type:String,
        required:true
    },
    sampleoutput:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    ogs:{
        language:{type:String, required:true},
        solution:{type:String, required:true}
    }

})

export const Problem = mongoose.model("Problem",problem);