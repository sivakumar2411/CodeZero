import mongoose from "mongoose";

const tc =new mongoose.Schema({

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required:true
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

export const Testcase = mongoose.model("Testcase",tc);