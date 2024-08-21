import mongoose from "mongoose";

export const connectToDB =async()=>{
    try {
        await mongoose.connect(process.env.MongoDB_URI, {
            dbName:"ProblemSolving"
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}