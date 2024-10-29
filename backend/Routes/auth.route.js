import express from "express";
import { loginValidation, signupValidation } from "../Middlewares/auth.validation.js";
import { login, signup } from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signupValidation, signup);

router.post("/login", loginValidation, login);

export default router;