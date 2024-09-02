import express from 'express';
import dotenv from 'dotenv';
import Routes from '../Routes/Routes.js';
import cors from 'cors';
import { connectToDB } from '../DataBase/DBCon.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3001;


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use("/Api",Routes);



app.listen(PORT,()=>{
    connectToDB();
    console.log("Server is Running on Portal "+PORT);
})