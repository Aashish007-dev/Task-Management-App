import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { getUsersController } from "../controller/user.controller.js";

const router = express.Router();

router.get('/get-users', verifyToken, adminOnly, getUsersController) 




export default router;