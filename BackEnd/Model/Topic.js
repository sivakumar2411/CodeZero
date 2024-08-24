import mongoose from "mongoose";

const tp = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }

})

export const Topic = mongoose.model("Topic",tp);