import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Low"
    },
    status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending"
    },

    dueDate: {
        type: Date,
        required: true
    },
    assignedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    attachments: [
        {
            type: String
        }
    ],
    todoCheckList: [todoSchema],
    progress: {
        type: Number,
        default: 0
    }

}, { timestamps: true })


const Task = mongoose.model("task", taskSchema);
export default Task;