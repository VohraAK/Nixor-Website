import Applicant from "../models/applicantModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createApplication = async (request, response, next) => {
    if (request.user.id != request.params.id) return next(errorHandler(401, 'You can only create an application from your own account!'));
    
    // check for already created application
    const existingApplicant = await Applicant.findOne({ user: request.params.id });
    if (existingApplicant) return next(errorHandler(401, 'You can only create an application once!'));

    const { fullName, DOB, citizenID, phoneNumber, permanentAddress, motherName, fatherName, schoolName, educationSystem, grades } = request.body;

    const newApplication = new Applicant({
        fullName,
        DOB,
        citizenID,
        phoneNumber,
        permanentAddress,
        motherName,
        fatherName,
        schoolName,
        educationSystem,
        grades,
        user: request.params.id,
    });

    await newApplication.save();
    response.status(200).json("Application created successfully!");
};