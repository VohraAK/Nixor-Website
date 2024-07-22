import express from "express";
import { signup, signin, signout } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/signout", signout);

export default authRouter;
