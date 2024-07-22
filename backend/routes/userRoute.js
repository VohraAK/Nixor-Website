import express from "express";
import { updateUser } from "../controllers/userController.js";
import { verifyUser } from "../utils/verifyUser.js";

const userRouter = express.Router();

userRouter.post("/update/:id", verifyUser, updateUser);

export default userRouter;
