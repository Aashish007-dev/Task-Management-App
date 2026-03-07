import UserModel from "../models/user.model.js";
import TaskModel from "../models/task.model.js";


export const getUsersController = async (req, res, next) => {
    try {
        const users = await UserModel.find({role: "user"}).select("-password");
        if(!users){
            return next(errorHandler(404, "Users not found"))
        }
        
        const userWithTaskCounts = await Promise.all(
            users.map(async (user) => {
                const pendingtasks = await TaskModel.countDocuments({
                    assignedTo: user._id,
                    status: "Pending"
                })

                const inProgressTask = await TaskModel.countDocuments({
                    assignedTo: user._id,
                    status: "In Progress"
                })

                const completedTask = await TaskModel.countDocuments({
                    assignedTo: user._id,
                    status: "Completed"
                })

                return {
                    ...user._doc,
                    pendingtasks,
                    inProgressTask,
                    completedTask
                }
            })
        )

        res.status(200).json(userWithTaskCounts);
    } catch (error) {
        next(error)
    }
}