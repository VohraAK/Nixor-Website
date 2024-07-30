import express from "express";
import { deleteStudent, enrollStudent, updateStudentDetails } from "../controllers/adminController.js";

import { verifyAdmin } from "../utils/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/enroll/:id", verifyAdmin, enrollStudent);
adminRouter.post("/update/:id", verifyAdmin, updateStudentDetails);
adminRouter.get("/delete/:id", verifyAdmin, deleteStudent);

export default adminRouter;