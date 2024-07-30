import { errorHandler } from "../utils/errorHandler.js";
import Student from "../models/studentModel.js";
import User from "../models/userModel.js";
// import { createStudent } from "./studentController.js";
import Applicant from "../models/applicantModel.js";

export const test = async (request, response, next) => {
  try {
    response.status(200).json("Admin route is working!");
  } catch (error) {
    next(error);
  }
};

export const enrollStudent = async (request, response, next) => {
    try 
    {
        // check if student already exists in the database
        const existingStudent = await Student.findOne({
            user: request.params.id,
        });

        if (existingStudent) return next(errorHandler(401, "Student already exists!"));

        // update userType, applicationStatus
        const updatedUser = await User.findByIdAndUpdate(
            request.params.id,
            {
                $set: {
                    userType: "student",
                },
            },
            { new: true }
        );

        if (!updatedUser) return next(errorHandler(404, "No user found!"));

        const updatedApplicant = await Applicant.findByIdAndUpdate(
            request.params.id,
            {
                $set: {
                    applicationStatus: "Accepted",
                },
            },
            { new: true }
        );

        if (!updatedApplicant) return next(errorHandler(404, "No applicant found!"));

        // create new student with subjectGrades and ECAs
        const newStudent = new Student({
            fullName: updatedUser.fullName,
            user: request.params.id,
            subjectGrades: request.body.subjectGrades,
            ECAs: request.body.ECAs,
        });

        await newStudent.save();

        response.status(200).json(newStudent);

    } 
    catch (error) 
    {
        next(error);    
    }
};


/* 
TODO endpoints:
- student enrollment (email student upon enrollment) ✅
- student details updating 
- student deleting
- grade changing
- ECAs changing
- student searching
*/