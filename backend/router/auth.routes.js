import express from "express";
import { changePassword, loginUser, logoutUser, resetPassword, resetPasswordResponse } from "../controllers/auth.controller.js";


const router = express.Router();

router.post('/login' , loginUser);
router.post('/resetpassword' , resetPassword);
router.post('/logout' , logoutUser);
router.post('/changepassword' , changePassword)


router.get('/resetpassword' , resetPasswordResponse);


export default router;
