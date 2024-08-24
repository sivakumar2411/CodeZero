import mongoose from "mongoose";

const ptotp = new mongoose.Schema({

    topic:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Topic'
    },
    problem:[
        {   type:mongoose.Schema.Types.ObjectId,
            ref:'Problem'
        }
    ]

})

export const TopicProblemMap = mongoose.model("TopicProblemMap",ptotp);