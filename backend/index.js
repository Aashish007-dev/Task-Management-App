import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoute from './routes/auth.route.js';
import userRoute from './routes/user.route.js'; 
import taskRoute from './routes/task.route.js';
import reportRoute from './routes/report.route.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express()

await connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
    
}));

app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/reports', reportRoute);

// serve static files from "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({success: false, message, statusCode});
})

app.listen(3000, () => {
    console.log('Server is running on port 3000!');
})