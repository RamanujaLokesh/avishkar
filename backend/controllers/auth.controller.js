import bcrypt from 'bcryptjs'
import pool from '../dbConfig.js'
import generateTokenAndSetCookie from '../utils/generateToken.js'
import crypto from 'crypto';
import nodemailer from 'nodemailer'



export const loginUser = async (req , res)=>{
    try {
        console.log("login")
        const {reg_no , password} = req.body;

        let user = await pool.query(`select * from student_details where reg_no = $1` ,[reg_no])
        const isPasswordCorrect = await bcrypt.compare(password , user?.rows[0].password||"")
        if(!user){
            console.log("incorect reg_no")
            res.status(400).json({error:"reg_no not found"})  
        }    else if( !isPasswordCorrect){
            console.log("incorrect password")
            res.status(400).json({error:"password incorrect"})
            
        }else{
           user = user.rows[0];
           let hostel = await pool.query(`select hostel_name , room_number from hostel_details where reg_no = $1`,[user.reg_no]);
        if(!hostel){
            return res.status(404).json({error:"user not found"});
        }
        hostel = hostel.rows[0]
        let auth_level = 1;
if(reg_no[0]==='A')auth_level = 3;
else if(reg_no[0]==='B')auth_level = 2;
        let obj = {reg_no:user.reg_no , name:user.name, clg_mail:user.clg_mail,ph_number:user.ph_number,gender:user.gender , hostel:hostel.hostel_name, room_no:hostel.room_no,auth_level}
           generateTokenAndSetCookie(obj , res);


            res.status(201).json({
            reg_no: user.reg_no,
            name:user.name,
            clg_mail:user.clg_mail,
            phone_no:user.ph_number,
            gender: user.gender,
            hostel:hostel.hostel_name,
            room_no:hostel.room_no,
            auth_level
            })
        }
        
    } catch (error) {
        console.log("error in login controller ", error.message)
        res.status(500).json({error: "internal server error"})
    }
}


export const resetPasswordMail = async(req,res)=>{

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or any other email service
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
})    
console.log(process.env.EMAIL_PASSWORD)

try {
    let user = await pool.query('select clg_mail from student_details where reg_no = $1' , [req.body.reg_no]);
    if(!user){
        console.log("user not fount in resetpsassword controller");
        res.status(400).json({error:"incorrect reg_no"});
    }
    user= user.rows[0]
    const token = crypto.randomBytes(20).toString('hex');

 
    const tokenExpiration = Date.now() + 3600000;

 
    await pool.query(`
        INSERT INTO reset_tokens (reg_no, token, expires_at , created_at)
        VALUES ($1, $2, $3 , $4)
        ON CONFLICT (reg_no) 
        DO UPDATE SET token = $2, expires_at = $3 , created_at =  $4;
    `, [req.body.reg_no, token, tokenExpiration , Date.now()]);
 const resetUrl = `http://localhost:3000/resetpassword/${token}`

 const mailOptions = {
    to: user.clg_mail,
    from: process.env.EMAIL,
    subject: 'Password Reset',
    text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n` +
        `Please click on the following link, or paste it into your browser to complete the process:\n\n` +
        `${resetUrl}\n\n` +
        `If you did not request this, please ignore this email and your password will remain unchanged.\n`
};


transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error('Error occurred');
        console.log(error.message);
        return process.exit(1);
    }
    console.log('Message sent successfully!');
    console.log(info);
});
res.status(201).json({message:"reset link sent successfully"})

} catch (error) {
    console.log("error in resetpassword controller ,", error.message);
        res.status(500).json({error:"internal  server error"})
    
}

}



export const logoutUser = (req, res)=>{

    try {
        console.log("logout")
        res.cookie("jwt" ,"" ,{maxAge:0});
        res.status(201).json({message:"loggedout successfully"});
        
    } catch (error) {
        console.log("error in logout controller ,", error.message);
        res.status(500).json({error:"internal  server error"})
        
    }
}



export const resetPassword = async(req, res)=>{
 const {token} = req.query;
try {
    let result = await pool.query('SELECT * FROM reset_tokens WHERE token = $1 AND expires_at > $2', [token, Date.now()]);
    console.log(result.rows)
 if (result.rows.length === 0) {
     return res.status(400).json({ error: 'Invalid or expired token' });
 }

 result = result.rows[0];

 res.send('<h1>hello</h1>')

} catch (error) {
    console.log("error in resetPasswordResponse conroller " ,error.message)
    res.status(500).json({error:"internal server error"})
}
 
}



export const changePassword = async(req , res)=>{
const {reg_no , newPassword} = req.body;
try {
    let userCheck = await pool.query('SELECT * FROM student_details WHERE reg_no = $1', [reg_no]);
    if (userCheck.rowCount === 0) {
        console.log("User not found with reg_no:", reg_no);
        return res.status(400).json({ error: "User not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10)
    let result = await pool.query(`UPDATE student_details SET password = $1 WHERE reg_no = $2;` , [hashedPassword , reg_no])
if(result.rowCount===0){
    console.log("cant update password ", result);
    res.status(400).json({error:"error in updating password"})
    throw new Error("error in updating password 'in query' ");
    
}
res.status(201).json({message:"successfully updated password"})
} catch (error) {
    console.log("error in changepassword controller " ,error)
    res.status(500).json({error:"internal server error"})
}
}
 


