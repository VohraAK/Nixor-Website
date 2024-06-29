import express, { json } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import applicantRouter from './routes/applicantRoute.js';
dotenv.config();

const DEV_PORT = process.env.DEV_PORT;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(DEV_PORT, () => {console.log(`Server is listening at port ${DEV_PORT}`)});

const connectDB = async () => {
    await mongoose.connect(MONGO_CONNECTION_STRING);
    console.log("Connected to Database!");
};
connectDB();

// app routers
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/applicant', applicantRouter);

// error-handling middleware
app.use((error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    return response.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});