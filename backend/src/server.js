import express from 'express'
import cors from "cors";
import noteRoute from './route/note.route.js'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import rateLimiter from './middlware/rateLimiter.js';
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())

app.use(cors({
   origin:"http://localhost:5173"
}));

// middleware
app.use(express.json())

app.use(rateLimiter)




// app.use((req,res,next) => {
//    console.log(`req method est ${req.method} et req url est ${req.url}`);
//    next()
// })

app.use('/api/notes',noteRoute)

connectDB().then(()=>{
   app.listen(PORT,()=>{
      console.log('server started a port: ',PORT); 
   })
})

// mongodb+srv://karimcoder48_db_user:mernstak@cluster0.g7w5npy.mongodb.net/?appName=Cluster0

