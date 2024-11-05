import express from "express";
import {getregno, unregisterMeal, userUnregisteredMeals } from "../controllers/user.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get('/getuserbytoken/:token' , getregno);
router.get('/unregisteredmeals', protectRoute , userUnregisteredMeals)


router.post('/unregistermeal', protectRoute , unregisterMeal)


export default router;