import express from 'express';
import { test } from '../controllers/adminController.js';
import { verifyAdmin } from '../utils/verifyAdmin.js';

const adminRouter = express.Router();
adminRouter.get("/test", verifyAdmin, test);

export default adminRouter;