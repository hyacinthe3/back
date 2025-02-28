import jwt from "jsonwebtoken";
import User from "../models/userModal.js";
import dotenv from "dotenv";
dotenv.config();

export const auth = async(req,res,next) =>{
    try {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({message:"authorisation header missing"});
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"token missing"});
    }



        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);

        if(!user){
            return res
            .status(401)
            .json({message:"User not found or token invalid"});
        }

        req.token = token;
        req.user = user;
        req.user.userRole = decoded.userRole;
        next();
    }
    catch(error){
        console.error("JWT Verification Error",error);//log the error for debugging
        res
        .status(401)
        .json({message:"Authentication failed",error:error.message});
        
    }
};