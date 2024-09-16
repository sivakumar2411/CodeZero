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
        // required:true
        default:"Easy"
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
    sampletestcases:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'TestCase'
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
    ogs:{
        language:{type:String, required:true},
        solution:{type:String, required:true}
    },
    codesnips:[
        {
            lang:{type:String,required:true},
            hiddensnips:{type:String, required:true},
            visisnips:{type:String, required:true}
        }
    ],
    status:{
        type:String,
        default:"Reqs"
    }

})

export const Problem = mongoose.model("Problem",problem);