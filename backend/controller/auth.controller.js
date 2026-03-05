import UserModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';


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

export const loginController = async (req, res, next) => {
    try {
        const {email, password} = req.body;

    if(!email || !password || email === "" || password === ""){ 
        return next(errorHandler(400, "All fields are required"))
    }

    const user = await UserModel.findOne({email});

    if(!user){
        return next(errorHandler(404, "User not found"));
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if(!isPasswordValid){
        return next(errorHandler(401, "Invalid credentials!"));
    }

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

    const {password: pass, ...rest} = user._doc;

    res.status(200).cookie('access_token', token, {
        httpOnly: true,
    }).json(rest)
    } catch (error) {
        next(error.message)
    }
}


export const userProfileController = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if(!user){
            return next(errorHandler(404, "User not found"))
        }

        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest);

    } catch (error) {
        next(error.message)
    }

}


export const updateProfileController = async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id);
        if(!user){
            return next(errorHandler(404, "User not found"))
        }

        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = bcrypt.hashSync(req.body.password, 10);
        }

        const updatedUser = await user.save();
        const {password: pass, ...rest} = updatedUser._doc;
        res.status(200).json(rest);
        
    } catch (error) {
        next(error.message)
    }
}