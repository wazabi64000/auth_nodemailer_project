import express from "express";
import { validateRegister, validateLogin, validateResetPasswordRequest } from "../middleware/validation.middleware.js";
import { register, verifyEmail, login, resetPasswordRequest, resetPassword } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.post('/login', validateLogin , login)
router.get("/verify", verifyEmail);
router.post('/reset-password-request',  validateResetPasswordRequest,resetPasswordRequest)
router.post('/reset-password', resetPassword)

export default router;
