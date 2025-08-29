import mongoose from "mongoose";

const input = new mongoose.Schema({
    varName:{
        type:"String",
        required:true
    },
    value:{
        type:"String",
        default:""
    }
})

export default input;