import express from "express";
import { adminOnly, verifyToken } from "../utils/verifyUser.js";
import { getUsersController, getUserByIdController } from "../controller/user.controller.js";


const router = express.Router();

router.get('/get-users', verifyToken, adminOnly, getUsersController);

router.get('/:id', verifyToken, getUserByIdController)




export default router;