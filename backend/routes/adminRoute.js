import express from "express";
import { enrollStudent, test } from "../controllers/adminController.js";
import { verifyAdmin } from "../utils/verifyAdmin.js";

const adminRouter = express.Router();
adminRouter.get("/test", verifyAdmin, test);
adminRouter.post("/enroll/:id", verifyAdmin, enrollStudent);

export default adminRouter;