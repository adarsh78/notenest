import express from "express";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../Controllers/todo.controller.js";
import { authenticateToken } from "../Middlewares/auth.jwtTokenVerification.js";

const router = express.Router();

router.post("/", authenticateToken, createTodo);
router.get("/", authenticateToken, getTodo);
router.put("/:id", authenticateToken, updateTodo);
router.delete("/:id", authenticateToken, deleteTodo);

export default router;