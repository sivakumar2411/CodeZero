import jwt from 'jsonwebtoken';

const GenerateJWT = (id,res) =>{
    const jwt = jwt.sign({id},process.env.Secret_Key,{
        expiresIn:'15d'
    })
    res.cookie("jwt",jwt,{
        maxAge:15 * 24 * 60 * 60 * 1000,
        httpOnly:true,
        // secure:true,
        // sameSite:"strict"
    })
}

export default GenerateJWT;