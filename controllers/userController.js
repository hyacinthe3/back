import User from "../models/userModal.js";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/tokenGenerating.js";

export const Register = async (req, res) => {
    try {
      const { userName, userEmail, userPassword, userRole } = req.body;
  
      // Check if the email already exists
      const existingUser = await User.findOne({ userEmail });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(userPassword, 10); // 10 is the salt rounds
  
      // Create new user object
      const user = new User({
        userName,
        userEmail,
        userPassword: hashedPassword,
        userRole  
      });
  
      // Generate access token
      const accessToken = generateAccessToken(user);
      user.tokens.accessToken = accessToken;  // Now you can assign the accessToken
  
      // Save user to the database
      await user.save();
  
      res.status(201).json({
        message: "Account created successfully",
        user: {
          _id:user._id,
          userName:user.userName,
          userEmail:user.userEmail,
          userRole:user.userRole,
          tokens: {
            accessToken: user.tokens.accessToken,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to register user", error: error.message });
    }
  };
  

export const Login = async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body;
      const user = await User.findOne({ userEmail });
  
      if (!user) {
        // User not found
        return res.status(404).json({ message: "User not found" });
      }
  
      const isMatch = await bcrypt.compare(userPassword, user.userPassword);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const accessToken = generateAccessToken(user);
  
  
      user.tokens.accessToken =  accessToken;
  
      await user.save();
  
      const userResponse = {
        _id:user._id,
        userName:user.userName,
        userEmail:user.userEmail,
        userRole:user.userRole,
        tokens:{accessToken:user.tokens.accessToken,},
      };
    
      res.json({ user: userResponse });
    } catch (error) {
      // General error handling
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };