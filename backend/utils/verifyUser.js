import { errorHandler } from "./errorHandler.js";
import jwt from 'jsonwebtoken';

export const verifyUser = (request, response, next) => {
    const accessToken = request.cookies.access_token;   // extract token from cookie (using cookie-parser)
    if (!accessToken) return next(errorHandler(401, 'Unauthorized')) ;

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (error, user) => {
        if (error) {
            return next(errorHandler(403, 'Forbidden'));
        };

        request.user = user // puts userid from jwt.verify into request.user
        next();
    });
};

