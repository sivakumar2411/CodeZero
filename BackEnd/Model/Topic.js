import mongoose from "mongoose";

const tp = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    problems:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Problem'
        }
    ]

})

export const Topic = mongoose.model("Topic",tp);