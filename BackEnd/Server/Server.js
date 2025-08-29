import express from 'express';
import dotenv from 'dotenv';
import Routes from '../Routes/Routes.js';
import cors from 'cors';
import { connectToDB } from '../DataBase/DBCon.js';
import cookieparser from 'cookie-parser';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(cookieparser());
try{
    app.use("/Api",Routes);
}
catch(e){
}


app.listen(PORT,()=>{
    connectToDB();
    console.log("Server is Running on Portal "+PORT);
})