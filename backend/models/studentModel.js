import mongoose from "mongoose";

const subjectGradeSchema = new mongoose.Schema({
    subject: {type: String, required: true},
    // percentages
    midterm: {type: Number, default: null},
    final: {type: Number, default: null},
    grade: {type: String, default: null}
});

// new students linked from user doc
const studentSchema = new mongoose.Schema({
    fullName: {type: String, required: true, default: null},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    subjectGrades: {type: subjectGradeSchema, required: true}, // each subject has a grade object, with midterm and final marks
});