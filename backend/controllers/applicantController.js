import Applicant from "../models/applicantModel.js";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createApplication = async (request, response, next) => {
  if (request.user.id != request.params.id)
    return next(
      errorHandler(
        401,
        "You can only create an application from your own account!"
      )
    );

  // check for already created application
  const existingApplicant = await Applicant.findOne({
    user: request.params.id,
  });
  if (existingApplicant)
    return next(errorHandler(401, "You can only create an application once!"));

  console.log(request.body);

  const {
    fullName,
    citizenID,
    phoneNumber,
    permanentAddress,
    motherName,
    fatherName,
    schoolName,
    educationSystem,
    grades,
  } = request.body;

  const newApplication = new Applicant({
    fullName,
    DOB: request.user.DOB,
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

  // modify userType field in user entry in db
  const user = await User.findByIdAndUpdate(
    { _id: request.params.id },
    { $set: { userType: "applicant" } },
    { new: true }
  );

  const { password, ...rest } = user._doc;

  response
    .status(200)
    .json({ message: "Application created successfully!", user: rest });
};

export const getApplicationStatus = async (request, response, next) => {
  if (request.user.id != request.params.id)
    return next(
      errorHandler(
        401,
        "You can only create an application from your own account!"
      )
    );
  const existingApplicant = await Applicant.findOne({
    user: request.params.id,
  });
  if (!existingApplicant)
    return next(errorHandler(404, "No application found!"));
  response.status(200).json(existingApplicant.applicationStatus);
};
