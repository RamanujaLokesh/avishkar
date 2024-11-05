import express from "express";
import { changePassword, loginUser, logoutUser, resetPasswordMail, resetPassword } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/login' , loginUser);
router.post('/sendmail/resetpassword' , resetPasswordMail);
router.post('/logout' , logoutUser);
router.post('/changepassword' , changePassword)


router.get('/resetpassword' , resetPassword);


export default router;
