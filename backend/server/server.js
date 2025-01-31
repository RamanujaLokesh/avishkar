import express from 'express'
import http from 'http'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


import pool from '../dbConfig.js'
import authRouter from '../router/auth.routes.js'
import dataRouter from '../router/data.router.js'
import userRouter from '../router/user.router.js'
import complaintRoutes from '../router/complaint.router.js';
import messageRouter from '../router/message.router.js';
import noticeUploadRoutes from '../router/noticeUpload.router.js';
import { fileURLToPath } from "url";
import setupSocket from './socket.js'
import path from 'path';

const app  = express();
const server = http.createServer(app);

setupSocket(server);


dotenv.config();


const port  = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"))

app.use("/api/auth" , authRouter);
app.use("/api/data" , dataRouter )
app.use('/api/user',userRouter);
app.use('/api/message', messageRouter);
app.use('/api/complaints', complaintRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const UPLOADS_FOLDER = path.join(__dirname, "uploads");
app.use("/uploads", express.static(UPLOADS_FOLDER));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/notice-board",noticeUploadRoutes );

app.get('/' , async(req,res)=>{
    const result = await pool.query("SELECT * FROM student_details ;");
       const  items = result.rows;
        console.log(items)
    res.send("../frontend/login.html")
})

server.listen(port, () => {
    console.log(`sever running on port ${port}`);
})