// userModel.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
  },
  userPassword: {
    type: String,
    required: true,
  },
  userRole: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
    required: true
  },
  tokens: {
    accessToken: { type: String }
  },
});

const User = mongoose.model('User', userSchema);

export default User;
