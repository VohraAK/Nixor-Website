import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
// import { createStudent } from "../controllers/studentController.js";
import { getStudent } from "../controllers/studentController.js";
const studentRouter = express.Router();

// studentRouter.post("/create/:id", verifyUser, createstudent); // redundant
studentRouter.get("/:id", verifyUser, getStudent);
// id is userID, used when clicked on Enroll button

export default studentRouter;
