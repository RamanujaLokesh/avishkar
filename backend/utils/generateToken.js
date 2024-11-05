import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie  = (obj , res)=>{
    const token = jwt.sign({...obj} , process.env.JWT_SECRET , {
        expiresIn: '15d'
    })
console.log(token)

    res.cookie("jwt" , token , {
        maxAge: 15*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    })
}

export default generateTokenAndSetCookie;