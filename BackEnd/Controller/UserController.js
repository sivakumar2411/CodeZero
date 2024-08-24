import { User } from "../Model/User.js";


export const postNewUser = async(req,res) =>{

    try{
        const {uname,name,email,password,gender,bio,notifications} = req.body;

        const user = new User({
            uname,name,email,password,gender,bio,notifications
        })

        await user.save();
        res.status(201).json({data:user});
    }
    catch(error){
        res.status(500).json({message:error.message});
        console.log("Error at Post New User "+error.message);
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

