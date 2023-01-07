import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import userRoute from './routes/auth'
import artistRoute from './routes/artist'
import albumRoute from './routes/albums'
import songRoute from './routes/songs'
import dotenv from 'dotenv';
import connectMongoDB from './Database';
dotenv.config()





// connect DB
connectMongoDB()



const app = express();
const PORT = process.env.PORT
 

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin : true}))



app.get("/", (req, res)=>{
    return res.json("Hai there......")
})


// User Authentication route
app.use('/api/users/', userRoute)
app.use('/api/artists/', artistRoute)
app.use('/api/albums/', albumRoute)
app.use('/api/songs/', songRoute)






app.listen(PORT, ()=> {
    console.log(`Server started on ${PORT}`)
})


