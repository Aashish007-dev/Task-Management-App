import express from "express";
import { signupController, loginController, userProfileController, updateProfileController, uploadImageController } from "../controller/auth.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post('/sign-up', signupController);
router.post('/login', loginController);

router.get('/user-profile', verifyToken,  userProfileController);
router.put('/update-profile', verifyToken, updateProfileController);

router.post('/upload-image', upload.single('image'), uploadImageController)

export default router;