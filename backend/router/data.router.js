import express from "express";
import { getDayMenu, getMenu, getregno, unregisterMeal } from "../controllers/data.controller.js";

const router = express.Router();

router.get('/getuserbytoken/:token' , getregno);
router.get('/getmenu/:hostel' , getMenu)
router.get('/getdaymenu' , getDayMenu)

router.post('/unregistermeal' , unregisterMeal)


export default router;