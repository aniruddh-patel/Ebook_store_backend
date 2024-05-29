import jwt from 'jsonwebtoken'
export const sendcookie = (user,res, message,statusCode=200)=>{
    const token=jwt.sign({_id:user._id}, process.env.JWT_SECRET)

    res.status(201).cookie("token",token, {
        httponly:true,
        maxAge:60*60*1000
    }).json({
        success:true,
        message
    })
}