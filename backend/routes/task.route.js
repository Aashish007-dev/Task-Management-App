import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { createTaskController, deleteTaskController, getDashboardDataController, getTaskByIdController, getTasksController, updateTaskController, updateTaskStatusController, updateTaskTodoController } from "../controller/task.controller.js";

const router = express.Router();


router.post('/create', verifyToken, adminOnly, createTaskController)

router.get('/', verifyToken, getTasksController)

router.get('/dashboard-data', verifyToken, adminOnly, getDashboardDataController)

router.get('/:id', verifyToken, getTaskByIdController)

router.put('/:id', verifyToken, updateTaskController)

router.delete('/:id', verifyToken, adminOnly, deleteTaskController)

router.put('/:id/status', verifyToken, updateTaskStatusController)

router.put('/:id/todo', verifyToken, updateTaskTodoController)

export default router;