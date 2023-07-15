import express from "express";
import authService from '../services/authService.js';

const router = express.Router();

router.get("/", authService.sessionChecker, authService.detailUser);
router.put("/", authService.sessionChecker, authService.updateUser);

export default router;