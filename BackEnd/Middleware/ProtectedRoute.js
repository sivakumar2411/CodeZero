import jwt from 'jsonwebtoken';

const protectedRoute = async(req,res,next) =>{
    try{
        const token = req.cookies.jwt;
        if(!token)
            return res.status(401).json({message:"Unauthorized - No Token"});
        const decode = jwt.verify(token,process.env.Secret_Key);
        if(!decode)
            return res.status(401).json({message:"Unauthorized - Invalid Token"});
        req.user = await User.findById(decode.userId);
        next();
    }
    catch(error){
        res.status(401).json({message:"Unauthorized"});
    }
 
}