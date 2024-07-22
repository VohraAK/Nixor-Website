import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    // first 3 are mandatory for signing up
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // rest can be modified after-the-fact
    fullName: { type: String, required: true },
    DOB: { type: Date, require: true, default: null },
    // default behaviour -> not admin until changed in db
    userType: { type: String, default: 'user' } // 'user', 'applicant', 'student', 'admin'
}, { timestamps: true })

const User = mongoose.model('User', userSchema);

export default User;