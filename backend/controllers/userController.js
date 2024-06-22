import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const updateUser = async (request, response, next) => {
    if (request.user.id != request.params.id) return next(errorHandler(401, 'You can only update your own account!'));

    try 
    {
        // hash new password if it exixts
        if (request.body.password)
        {
            request.body.password = bcryptjs.hashSync(request.body.password, 20);
        }

        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set : {
                username: request.body.username,
                firstName: request.body.firstName,
                lastName: request.body.lastName,
                address: request.body.address,
                DOB: request.body.DOB,
                email: request.body.email,
            }
        }, {new: true}) //  sets updated fields into a new user and updates it in db
        
        const {password: pass, ...rest} = updatedUser._doc;
        response.status(200).json(rest);
    }
        
    catch (error) 
    {
        next(error);
    }
};