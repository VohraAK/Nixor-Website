import User from "../models/userModel.js";
import {errorHandler} from "../utils/errorHandler.js";
import bcryptjs from 'bcryptjs';

export const signup = async (request, response, next) => {
    try 
    {
        const { username, email, password } = request.body;

        // check if user already exists in the database (username)
        const existingUser = await User.findOne({ username: username, email: email });

        if (existingUser) { return(next(errorHandler(401, "User already exists!"))) };

        // hash password, salt length 20
        const hashedPassword = bcryptjs.hashSync(password, 10);

        // create new user
        const newUser = new User(
        {
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        response.status(200).json("User created succesfully!");
    } 
    catch (error) { next(error) };
};
