import { errorHandler } from "./errorHandler.js";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = (request, response, next) => {
  const accessToken = request.cookies.access_token; // extract token from cookie (using cookie-parser)
  if (!accessToken) return next(errorHandler(401, "Unauthorized"));

  jwt.verify(accessToken, process.env.JWT_SECRET_KEY, async (error, user) => {
    if (error) {
      return next(errorHandler(403, "Forbidden"));
    }

    // check for admin status
    const _ = await User.findOne({
      _id: user.id,
    })

    if (_.userType !== "admin") {
      return next(errorHandler(403, "Forbidden"));
    };

    request.user = user; // puts userid from jwt.verify into request.user
    next();
  });
};
