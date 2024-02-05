import express from 'express'
import dotenv from 'dotenv'
import connect from './config/db.js'
import cors from 'cors'
import authRouter from './routes/authRoutes.js'
import productRouter from './routes/productRoutes.js'
// import { authenticate } from './middleware/auth.js'
dotenv.config()
const app = express()

app.use(express.json());

app.use("/images", express.static("images"));

app.use(cors({
    origin: 'http://localhost:5173',
 credentials: true,
}))



app.use((req,res,next) => {
    console.log(`//${req.method} ${req.path} `);
    next()
})



//Routes goes here

app.use("/api/auth",authRouter)
app.use('/api/products',productRouter)

//this middleware coonect to the mongodb atlas cluster, 'db_string' is the connection string
await connect(process.env.CONNECTION_STRING)

app.listen(process.env.PORT,(err) => {
    if(err){
        console.log('Something went wrong',err);
    }
    else{
        console.log(`Server starting on port ${process.env.PORT}`);
    }
    
})
