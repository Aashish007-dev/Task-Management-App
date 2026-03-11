import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { createTaskController, getTasksController } from "../controller/task.controller.js";

const router = express.Router();


router.post('/create', verifyToken, adminOnly, createTaskController)

router.get('/', verifyToken, getTasksController)








export default router;