import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { FILE_SIZE } from './constants.js'

const app=express()

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit:FILE_SIZE}))
app.use(express.urlencoded({extended:true,limit:FILE_SIZE}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import 
import { router } from './routes/users.routes.js'

//routes declaration
app.use("/api/v1/users",router)
//http:localhost:8000/api/v1/users/register

export { app }  