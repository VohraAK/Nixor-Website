import express from "express";
import {
  deleteStudent,
  enrollStudent,
  getApplicants,
  getStudents,
  updateStudentDetails,
} from "../controllers/adminController.js";

import { verifyAdmin } from "../utils/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/enroll/:id", verifyAdmin, enrollStudent);
adminRouter.post("/update/:id", verifyAdmin, updateStudentDetails);
adminRouter.get("/delete/:id", verifyAdmin, deleteStudent);
adminRouter.get("/get-students", verifyAdmin, getStudents);
adminRouter.get("/get-applicants", verifyAdmin, getApplicants);

export default adminRouter;
