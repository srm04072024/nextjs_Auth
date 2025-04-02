import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please provide an emali"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide an emali"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

// since Next js is running on edge so it don't know is it connected to mongoDB or not?
// So we define models in next js in different way
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
