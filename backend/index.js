import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const DEV_PORT = process.env.DEV_PORT;

const app = express();

app.listen(DEV_PORT, () => {console.log(`Server is listening at port ${DEV_PORT}`)});