import express from "express";
import { getDayMenu, getMenu, getNotices } from "../controllers/data.controller.js";
import protectRoute from '../middleware/protectRoute.js'

const router = express.Router();


router.get('/getmenu/', protectRoute , getMenu)
router.get('/getdaymenu' , getDayMenu)
router.get('/notice' , protectRoute , getNotices);




export default router;