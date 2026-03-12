import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { createTaskController, deleteTaskController, getTaskByIdController, getTasksController, updateTaskController, updateTaskStatusController } from "../controller/task.controller.js";

const router = express.Router();


router.post('/create', verifyToken, adminOnly, createTaskController)

router.get('/', verifyToken, getTasksController)

router.get('/:id', verifyToken, getTaskByIdController)

router.put('/:id', verifyToken, updateTaskController)

router.delete('/:id', verifyToken, adminOnly, deleteTaskController)

router.put('/:id/status', verifyToken, updateTaskStatusController)

export default router;