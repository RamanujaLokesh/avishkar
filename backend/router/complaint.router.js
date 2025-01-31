import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { addComplaint, getAllComplaints, getComplaints } from '../controllers/complaint.controller.js';
import authLevel2 from '../middleware/authLevel2.js';

const router = express.Router();

router.post('/add', protectRoute, addComplaint);

router.get('/fetch', protectRoute, getComplaints);

router.get('/fetchall/:hostel', authLevel2, getAllComplaints);

export default router;
