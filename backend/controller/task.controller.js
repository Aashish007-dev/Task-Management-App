import { errorHandler } from "../utils/error.js";
import TaskModel from "../models/task.model.js";

export const createTaskController = async (req, res, next) => {
    try {
        const { title, description, priority, dueDate, assignedTo, attachments, todoCheckList } = req.body;
        
        if(!Array.isArray(assignedTo)){
            return next(errorHandler("Assigned to must be an array of user ids", 400))
        }

        const task = await TaskModel.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoCheckList,
            createdBy: req.user.id
        })

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        })
    } catch (error) {
        next(error)
    }
}