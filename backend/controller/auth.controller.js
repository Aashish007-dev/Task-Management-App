import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";


export const signupController = async (req, res, next) => {
    const {name, email, password, profileImageUrl, adminJoinCode} = req.body;

    if(!name || !email || !password || name === "" || email === "" || password === ""){
        return next(errorHandler(400, "All fields are required"))
    }

    const isAlreadyExist = await UserModel.findOne({email});

    if(isAlreadyExist){
        return next(errorHandler(400, "User already exists"));
    }

    let role = "user";
    if(adminJoinCode && adminJoinCode === process.env.ADMIN_JOIN_CODE){
        role = "admin";
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new UserModel({
        name,
        email,
        password: hashedPassword,
        profileImageUrl,
        role
    });

    try {
        await user.save();
        res.status(201).json({success: true, message: "Signup successfully"});
    } catch (error) {
        return next(error.message)
    }
    

}