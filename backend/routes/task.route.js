import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { createTaskController } from "../controller/task.controller.js";

const router = express.Router();


router.post('/create', verifyToken, adminOnly, createTaskController)








export default router;