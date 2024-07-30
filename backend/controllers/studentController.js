import Student from "../models/studentModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createStudent = async (request, response, next) => {
  try {
    if (request.user.id != request.params.id)
      return next(
        errorHandler(401, "You can only enroll from your own account!")
      );
    // check if user already exists in the database (username)
    const existingStudent = await Student.findOne({
      user: request.params.id,
    });

    if (existingStudent) {
      return next(errorHandler(401, "Student already exists!"));
    }

    // create new student
    const newStudent = new Student({
      fullName: request.body.fullName, // taken from redux store (can only be accessed when signed in)
      user: request.params.id,
      subjectGrades: request.body.subjectGrades, // add subject names in application form (subject grades and ECAs only be updated by admin)
      ECAs: request.body.ECAs,
    });

    await newStudent.save();
    response.status(200).json("Student created succesfully!");
  } catch (error) {
    next(error);
  }
};

export const getStudent = async (request, response, next) => {
  try {
    if (request.user.id !== request.params.id)
      return next(errorHandler(401, "You can only update your own account!"));
    const existingStudent = await Student.findOne({
      user: request.params.id,
    });
    if (!existingStudent) return next(errorHandler(404, "No student found!"));
    response.status(200).json(existingStudent);
  } catch (error) {
    next(error);
  }
};
