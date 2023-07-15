import express from "express";
import authService from '../services/authService.js';

const router = express.Router();

router.post("/login", authService.login);
router.post("/register", authService.register);

export default router;