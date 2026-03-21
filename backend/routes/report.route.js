import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { exportTasksReportController, exportUsersReportController } from "../controller/report.controller.js";


const router = express.Router();

router.get('/export/tasks', verifyToken, adminOnly, exportTasksReportController)

router.get('/export/users', verifyToken, adminOnly, exportUsersReportController)

export default router;

