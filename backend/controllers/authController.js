import { response } from "express";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

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

// add signin and userauth before updating user, since the user would need to be verified by a utility function in controller
// file before being able to update

export const signin = async (request, response, next) => {
    try 
    {
        const { username, password } = request.body;

        // check if user exists
        const existingUser = await User.findOne({ username: username });

        if (!existingUser) { return next(errorHandler(404, 'Invalid credentials!')) };

        // check for valid password
        const validPassword = bcryptjs.compareSync(password, existingUser.password);

        if(!validPassword) { return next(errorHandler(401, 'Invalid credentials!')) };

        // create user session
        const accessToken = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY);

        // remove password from existingUser object
        const { password: _, ...user } = existingUser._doc;

        // create an access cookie
        response.cookie('access_token', accessToken, { httpOnly: true }).status(200).json(user);
    } 
    catch (error) { next(error) }
};

export const signout = async (request, response, next) => {
    try 
    {
        response.clearCookie('access_token');
        response.status(200).json("User has been signed out");
    } 
    catch (error) { next(error) }
};