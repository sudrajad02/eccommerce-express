import express from "express";
import authService from '../services/authService.js';
import checkoutService from '../services/checkoutService.js';

const router = express.Router();

router.get("/:account_id", authService.sessionChecker, checkoutService.getCheckout);
router.post("/", authService.sessionChecker, checkoutService.createCheckout);

export default router;