import express from "express";
import authService from '../services/authService.js';
import cartService from '../services/cartService.js';

const router = express.Router();

router.get("/:account_id", authService.sessionChecker, cartService.getCart);
router.post("/", authService.sessionChecker, cartService.createCart);
router.delete("/:id", authService.sessionChecker, cartService.deleteCart);

export default router;