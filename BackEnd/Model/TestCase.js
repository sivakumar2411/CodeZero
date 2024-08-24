import mongoose from "mongoose";

const tc =new mongoose.Schema({

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    },
    input: {
        type: String,
        required: true
    },
    output: {
        type: String,
        required: true
    },
    isSample:{
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

export const Testcase = mongoose.model("Testcase",tc);