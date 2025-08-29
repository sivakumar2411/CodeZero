import jwt from 'jsonwebtoken';

const GenerateJWT = (id,res) =>{
    const jwtt = jwt.sign({id},process.env.Secret_Key,{
        expiresIn:'15d'
    })
    res.cookie("jwt",jwtt,{
        maxAge:3 * 24 * 60 * 60 * 1000,
        // maxAge:60 * 1000,
        httpOnly:true,
        // secure:true,
        sameSite:"strict"
    })
}

export default GenerateJWT;