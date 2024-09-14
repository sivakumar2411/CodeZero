import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";
import GenerateJWT from "../Util/GenerateToken.js";

export const postNewUser = async(req,res) =>{

    try{
        const {uname,name,email,password} = req.body;

        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({
            uname,name,email,password:hashedPassword
        })
        GenerateJWT(user._id,res);

        await user.save();
        res.status(201).json({data:user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Post New User "+error.message);
    }

}

export const LogIn = async(req,res) =>{
    try{
    const {username,password} = req.body;
    
    const user = await User.findOne({uname:username} || {email:username});

    if(!user)
        return res.status(400).json({message: "User not found"});
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).json({message: "Wrong Password"});

    GenerateJWT(user._id,res);
    res.json({user});}
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Login "+error.message);
    }
}

export const LogOut = async(req,res) =>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.json({message:"Logged Out Successfully"});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Logout "+error.message);
    }
}

export const updateUser = async(req,res) =>{
    
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({data:user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Update User "+error.message);
    }
}

export const getAllUser = async(req,res) =>{
    
    try{
        const users = await User.find();
        res.status(200).json({data:users});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Get All User "+error.message);
    }
}

export const getUserById = async(req,res) =>{
    
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message:"User not found"});
        res.status(200).json({data:user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Get User By Id "+error.message);
    }
}

