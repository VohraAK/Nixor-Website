import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import { createstudent } from "../controllers/studentController.js";
import { getstudent } from "../controllers/studentController.js";
const studentRouter = express.Router();

studentRouter.post("/create/:id", verifyUser, createstudent);
studentRouter.get("/:id", verifyUser, getstudent);
// id is userID, used when clicked on Enroll button

export default studentRouter;
