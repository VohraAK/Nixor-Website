/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  applicationStart,
  applicationSuccess,
  applicationFaliure,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function Apply() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const grades = ["A*", "A", "B", "C", "D", "E", "U"];
  const compulsorySubjectsList = [
    "English Language",
    "Islamiyat",
    "Mathematics",
    "Pakistan Studies",
    "Urdu",
  ];
  const electiveSubjectsList = [
    "Accounting",
    "Additional Mathematics",
    "Arabic",
    "Biology",
    "Business Studies",
    "Chemistry",
    "Computer Science",
    "Economics",
    "Enviromental Management",
    "Physics",
    "Sociology",
  ];

  const [formData, setFormData] = useState({
    fullName: "",
    citizenID: "",
    phoneNumber: "",
    permanentAddress: "",
    motherName: "",
    fatherName: "",
    schoolName: "",
    educationSystem: "",
    grades: {
      compulsorySubjects: {},
      electiveSubjects: {},
    },
  });
  const [errors, setErrors] = useState({});
  const [formSubmitError, setFormSubmitError] = useState(null);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  console.log(formData);

  const handleFormChange = (e) => {
    if (e.target.type === "text") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    if (e.target.id === "educationSystem") {
      if (e.target.value === '-') { e.target.value = "" }
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleGradesChange = (e, subject) => {
    if (e.target.id === "compulsorySubjects") {
      setFormData({
        ...formData,
        grades: {
          ...formData.grades,
          compulsorySubjects: {
            ...formData.grades.compulsorySubjects,
            [subject]: e.target.value,
          },
        },
      });
    } else if (e.target.id === "electiveSubjects") {
      setFormData({
        ...formData,
        grades: {
          ...formData.grades,
          electiveSubjects: {
            ...formData.grades.electiveSubjects,
            [subject]: e.target.value,
          },
        },
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(applicationStart());
      setFormSubmitLoading(true);
      setFormSubmitError(null);

      await validationSchema.validate(formData, { abortEarly: false });

      // send formData
      const response = await fetch(`/api/applicant/create/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data);

      if (data.success === false) {
        dispatch(applicationFaliure(data.message));
        setFormSubmitLoading(false);
        setFormSubmitError(data.message);
        return;
      }

      setFormSubmitLoading(false);
      setFormSubmitError(null);

      // load new user
      dispatch(applicationSuccess(data));

      navigate("/profile");
    } catch (error) {
      dispatch(applicationFaliure(error.message));
      console.log(error);
      setFormSubmitLoading(false);
      setFormSubmitError(true);

      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be more than 3 characters long")
      .max(50, "Name length should not exceed 50 characters"),
    citizenID: Yup.string()
      .required("Citizen ID is required")
      .min(13, "Citizen ID must be a 13 character string")
      .max(13, "Citizen ID must be a 13 character string"),
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .length(11, "Phone number must be 11 characters long")
      .max(11, "Phone number must be 11 characters long"),
    permanentAddress: Yup.string()
      .required("Address is required")
      .min(3, "Address must be more than 3 characters long")
      .max(50, "Address should not exceed 50 characters"),
    motherName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be more than 3 characters long")
      .max(50, "Name length should not exceed 50 characters"),
    fatherName: Yup.string()
      .required("Name is required")
      .min(3, "Name must be more than 3 characters long")
      .max(50, "Name length should not exceed 50 characters"),
    schoolName: Yup.string().required("Institution name is required"),
    educationSystem: Yup.string().required("Education system is required"),
  });

  return (
    <div className="flex flex-col font-inter">
      <h1 className="text-3xl p-10">
        Hello{" "}
        <span className="text-red-700 font-bold">
          {currentUser.firstName || currentUser.username}
        </span>
        , start your application!
      </h1>
      <div className="w-full border border-t-2 border-b-0 flex p-10 sm:p-12">
        <form onSubmit={handleFormSubmit}>
          <div className="flex gap-10 flex-wrap w-full">
            <div className="flex flex-col flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-6 w-full p-2">
                  <span className="text-red-700 font-semibold text-4xl">1</span>
                  <span className="text-2xl font-semibold">
                    Personal Information
                  </span>
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label className="pl-2 pb-1">Full Name</label>
                  <input
                    id="fullName"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.fullName && (
                    <p className="text-red-700 pl-2">{errors.fullName}</p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label className="pl-2 pb-1">Citizen ID</label>
                  <input
                    id="citizenID"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.citizenID && (
                    <p className="text-red-700 pl-2">{errors.citizenID}</p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label className="pl-2 pb-1">Phone Number (03XX-)</label>
                  <input
                    id="phoneNumber"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-700 pl-2">{errors.phoneNumber}</p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label className="pl-2 pb-1">Permanent Address</label>
                  <input
                    id="permanentAddress"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.permanentAddress && (
                    <p className="text-red-700 pl-2">
                      {errors.permanentAddress}
                    </p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label htmlFor="" className="pl-2 pb-1">
                    Mother Name
                  </label>
                  <input
                    id="motherName"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.motherName && (
                    <p className="text-red-700 pl-2">{errors.motherName}</p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label htmlFor="" className="pl-2 pb-1">
                    Father Name
                  </label>
                  <input
                    id="fatherName"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.fatherName && (
                    <p className="text-red-700 pl-2">{errors.fatherName}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-6 w-full p-2">
                  <span className="text-red-700 font-semibold text-4xl">2</span>
                  <span className="text-2xl font-semibold">
                    School Information
                  </span>
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label htmlFor="" className="pl-2">
                    School Name
                  </label>
                  <input
                    id="schoolName"
                    onChange={handleFormChange}
                    type="text"
                    className="rounded-md p-2 border"
                  />
                  {errors.schoolName && (
                    <p className="text-red-700 pl-2">{errors.schoolName}</p>
                  )}
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label htmlFor="" className="pl-2 pb-1">
                    Educational System
                  </label>
                  <select
                    id="educationSystem"
                    onChange={handleFormChange}
                    defaultValue={null}
                    className="border rounded-md p-2"
                  >
                    <option value={null}>-</option>
                    <option value={"OL"}>Cambridge O-Level</option>
                    <option value={"Matric"}>Matriculation</option>
                  </select>
                  {errors.educationSystem && (
                    <p className="text-red-700 pl-2">
                      {errors.educationSystem}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 flex-wrap border border-slate-300 rounded-xl shadow-sm p-8 w-full sm:w-[750px] mx-auto">
              <div className="flex flex-col items-center gap-5">
                <div className="flex items-center gap-6 w-full p-2">
                  <span className="text-red-700 font-semibold text-4xl">3</span>
                  <span className="text-2xl font-semibold">
                    Academic Grades
                  </span>
                </div>

                <div className="flex flex-col w-full sm:w-[600px]">
                  <label htmlFor="" className="pl-2 pb-2 font-semibold">
                    Compulsory Subjects
                  </label>

                  <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col w-full sm:w-[600px] gap-3">
                      {compulsorySubjectsList.map((subject) => (
                        <div key={subject} className="flex justify-between">
                          <div
                            id={subject}
                            className="w-8/12 border rounded-md p-2 bg-white border-slate-300"
                          >
                            {subject}
                          </div>

                          <select
                            onChange={(e) => handleGradesChange(e, subject)}
                            id="compulsorySubjects"
                            className="w-3/12 sm:w-2/12 border rounded-md p-2 border-slate-300"
                          >
                            <option value={null}>-</option>
                            {grades.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                  <label htmlFor="" className="pl-2 pt-10 pb-2 font-semibold">
                    Elective Subjects
                  </label>
                  <div className="w-full flex flex-col gap-2">
                    <div className="flex flex-col w-full sm:w-[600px] gap-3">
                      {electiveSubjectsList.map((subject) => (
                        <div key={subject} className="flex justify-between">
                          <div
                            id={subject}
                            className="w-8/12 border rounded-md p-2 bg-white border-slate-300"
                          >
                            {subject}
                          </div>

                          <select
                            onChange={(e) => handleGradesChange(e, subject)}
                            id="electiveSubjects"
                            className="w-3/12 sm:w-2/12 border rounded-md p-2 border-slate-300"
                          >
                            <option value={null}>-</option>
                            {grades.map((grade) => (
                              <option key={grade} value={grade}>
                                {grade}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="bg-red-700 text-white font-semibold px-4 py-3 rounded-lg"
              >
                {formSubmitLoading ? "Submitting..." : "Submit Application"}
              </button>
              {formSubmitError && (
                <p className="text-red-700 pl-2">{formSubmitError}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
