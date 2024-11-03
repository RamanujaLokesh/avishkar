import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie  = (reg_no , res)=>{
    const token = jwt.sign({reg_no} , process.env.JWT_SECRET , {
        expiresIn: '15d'
    })

    res.cookie("jwt" , token , {
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    })
}

export default generateTokenAndSetCookie;