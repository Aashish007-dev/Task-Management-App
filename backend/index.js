import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';

const app = express()

await connectDB();

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    
}));





app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})