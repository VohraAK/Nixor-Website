import { errorHandler } from "../utils/errorHandler.js";


export const test = async (request, response, next) => {
    try 
    {
        response.status(200).json("Admin route is working!");
    }
    catch (error) 
    {
        next(error);    
    }
};