import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    DOB: { type: Date, require: true, default: null }, // take from user data
    citizenID: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    permanentAddress: {type: String, required: true}, 
    motherName: {type: String, required: true},
    fatherName: {type: String, required: true},
    schoolName: {type: String, required: true},
    educationSystem: {type: String, required: true},
    grades: {type: Object, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    applicationStatus: {type: String, default: 'pending'}, // takes values from 'pending', 'accepted' and 'rejected'

}, {timestamps: true});

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;