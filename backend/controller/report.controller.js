import TaskModel from "../models/task.model.js";
import ExcelJs from "exceljs";
import UserModel from "../models/user.model.js";

export const exportTasksReportController = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find().populate('assignedTo', 'name email');

        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet('Tasks Report')

        worksheet.columns = [
            { header: 'Task Id', key: '_id', width: 25 },
            { header: 'Title', key: 'title', width: 30 },
            { header: 'Description', key: 'description', width: 50 },
            { header: 'Status', key: 'status', width: 20 },
            { header: 'Priority', key: 'priority', width: 15 },
            { header: 'Due Date', key: 'dueDate', width: 20 },
            { header: 'Assigned To', key: 'assignedTo', width: 30 },

        ]

        tasks.forEach((task) =>{
            const assignedTo = task.assignedTo.map((user) => `${user.name} (${user.email})`).join(', ');

            worksheet.addRow({
                _id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                dueDate: task.dueDate.toISOString().split('T')[0],
                assignedTo: assignedTo || "Unassigned"
            })
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        res.setHeader("Content-Disposition", "attachment; filename=tasks_report.xlsx")

        return workbook.xlsx.write(res).then(() => {
            res.end();
        })
    } catch (error) {
        next(error);
    }
}


export const exportUsersReportController = async (req, res, next) => {
    try {
        const users = await UserModel.find().select('name email _id').lean();

        const userTasks = await TaskModel.find().populate('assignedTo', 'name email _id');

        const userTaskMap = {}

        users.forEach((user) => {
            userTaskMap[user._id] = {
                name: user.name,
                email: user.email,
                taskCount: 0,
                completedTask: 0,
                pendingTasks: 0,
                inProgressTask: 0
            }
        })

        userTasks.forEach((task) => {
            if(task.assignedTo){
                task.assignedTo.forEach((assignedUser) => {
                    if(userTaskMap[assignedUser._id]){
                        userTaskMap[assignedUser._id].taskCount += 1;

                        if(task.status === "Pending"){
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        }else if(task.status === "Completed"){
                            userTaskMap[assignedUser._id].completedTask += 1;
                        }else if(task.status === "In Progress"){
                            userTaskMap[assignedUser._id].inProgressTask += 1;
                        }
                    }
                })

            }
            
        })

        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet("Users Tasks Report");

        worksheet.columns = [
            { header: "User Name", key: "name", width: 30 },
            { header: "Email", key: "email", width: 50 },
            { header: "Total Assigned Tasks", key: "taskCount", width: 20 },
            { header: "Completed Tasks", key: "completedTasks", width: 20 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
        ]

        
        Object.values(userTaskMap).forEach((user) => {
            worksheet.addRow(user);
        })

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
        res.setHeader("Content-Disposition", "attachment; filename=users_report.xlsx")

        return workbook.xlsx.write(res).then(() => {
            res.end();
        })
    } catch (error) {
        next(error);
    }
}