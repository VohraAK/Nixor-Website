import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  midterm: { type: Number, default: null }, // percentage
  final: { type: Number, default: null }, // percentage
  grade: { type: String, default: null }, // letter grade (A-F)
});

const subjectGradeSchema = new mongoose.Schema({
  subject: [subjectSchema]
});

// new students linked from user doc
const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true, default: null },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  subjectGrades: { type: subjectGradeSchema, required: true }, // each subject has a grade object, with midterm and final marks
  ECAs: {type: Array, default: []}, // Footballer, Basketballer, Volleyballer, President, Secretary, Treasurer, etc 
});

const Student = mongoose.model("Student", studentSchema);

export default Student;