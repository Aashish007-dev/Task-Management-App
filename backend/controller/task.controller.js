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


export const getTasksController = async (req, res, next) => {
    try {
        const {status} = req.query;

        let filter = {};

        if(status){
            filter.status = status
        }

        let tasks

        if(req.user.role === "admin"){
            tasks = await TaskModel.find(filter).populate("assignedTo", "name email profileImageUrl")

        }else{
            tasks = await TaskModel.find({
                ...filter,
                assignedTo: req.user.id
            }).populate("assignedTo", "name email profileImageUrl")
        }

        tasks = await Promise.all(tasks.map(async (task) => {
            const completedCount = task.todoCheckList.filter((item) => item.completed).length;

            return {...task._doc, completedCount: completedCount}

        }))

        // status summary count

        const allTasks = await TaskModel.countDocuments(
            req.user.role === "admin" ? {} : {assignedTo: req.user.id}
        )
        const pendingTasks = await TaskModel.countDocuments({
            ...filter,
            status: "Pending",
            ...(req.user.role !== "admin" && {assignedTo: req.user.id})
        })
        const inProgressTasks = await TaskModel.countDocuments({
            ...filter,
            status: "In Progress",
            ...(req.user.role !== "admin" && {assignedTo: req.user.id})
        })
        const completedTasks = await TaskModel.countDocuments({
            ...filter,
            status: "Completed",
            ...(req.user.role !== "admin" && {assignedTo: req.user.id})
        })

        res.status(200).json({
            success: true,
            message: "Tasks fetched successfully",
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks
            }
        })

    } catch (error) {
        next(error)
    }
}