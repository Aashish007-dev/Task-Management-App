import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { createTaskController, deleteTaskController, getTaskByIdController, getTasksController, updateTaskController } from "../controller/task.controller.js";

const router = express.Router();


router.post('/create', verifyToken, adminOnly, createTaskController)

router.get('/', verifyToken, getTasksController)

router.get('/:id', verifyToken, getTaskByIdController)

router.put('/:id', verifyToken, updateTaskController)

router.delete('/:id', verifyToken, adminOnly, deleteTaskController)

export default router;