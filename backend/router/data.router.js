import express from "express";
import { changeMenu, getDayMenu, getMenu, getNotices, getUnRegStudents } from "../controllers/data.controller.js";
import protectRoute from '../middleware/protectRoute.js'
import authLevel2 from "../middleware/authLevel2.js";

const router = express.Router();


router.get('/getmenu/', protectRoute , getMenu)
router.get('/getdaymenu' , getDayMenu)
router.get('/notice' , protectRoute , getNotices);
router.get('/unregstudents/:hostel',authLevel2,getUnRegStudents)


router.post('/updatemenu' , authLevel2 , changeMenu);




export default router;