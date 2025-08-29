import jwt from 'jsonwebtoken';

const AuthenticateJWT = (req,res,next) =>{
    const token = req.cookies.jwt;

    if(!token) return res.status(401).json({message:"Unauthorized"});
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        res.status(401).json({message:"Something went wrong"});
    }
}

export default AuthenticateJWT;