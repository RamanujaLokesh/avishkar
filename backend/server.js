import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


import pool from './dbConfig.js'
import authRouter from './router/auth.routes.js'
import dataRouter from './router/data.router.js'

const app  = express();
dotenv.config();


const port  = 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"))

app.use("/api/auth" , authRouter);
app.use("/api/data" , dataRouter )

app.get('/' , async(req,res)=>{
    const result = await pool.query("SELECT * FROM student_details ;");
       const  items = result.rows;
        console.log(items)
    res.send("../frontend/login.html")
})

app.listen(port, () => {
    console.log(`sever running on port ${port}`);
})