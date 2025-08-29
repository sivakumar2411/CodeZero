import mongoose from "mongoose";
import input from "./Input.js";

const tc =new mongoose.Schema({

    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem",
        required:true
    },
    input: [input],
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