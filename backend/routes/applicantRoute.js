import express from "express";
import { verifyUser } from "../utils/verifyUser.js";
import {
  createApplication,
  getApplicationStatus,
} from "../controllers/applicantController.js";

const applicantRouter = express.Router();

applicantRouter.post("/create/:id", verifyUser, createApplication); // id is userID
applicantRouter.get("/checkstatus/:id", verifyUser, getApplicationStatus); // id is userID

export default applicantRouter;
