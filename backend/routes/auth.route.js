import express from "express";
import { signupController, loginController, userProfileController, updateProfileController } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/sign-up', signupController);
router.post('/login', loginController);

router.get('/user-profile', verifyToken,  userProfileController);
router.put('/update-profile', verifyToken, updateProfileController)

export default router;