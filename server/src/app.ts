import express from 'express';
import path from 'path';
import cookieParser = require('cookie-parser');
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()





// connect DB
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_STRING as string)
.then(()=>{
    console.log("Database Connected Successfully")
})
.catch((error)=> {
    console.log(error)
})



const app = express();
const PORT = process.env.PORT
 




app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get("/", (req, res)=>{
    return res.json("Hai there......")
})




app.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`)
})


