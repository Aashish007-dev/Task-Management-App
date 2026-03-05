import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: [6, "Password must be at least 6 characters long"]
    },

    profileImageUrl: {
        type: String,
        default: ""
    },

    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, {timestamps: true});

const User = mongoose.model("user", userSchema);

export default User;