import express from "express";
import { validateRegister } from "../middleware/validation.middleware.js";
import { register, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", validateRegister, register);
router.get("/verify", verifyEmail);

export default router;
