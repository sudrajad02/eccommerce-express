import express from "express";
import productService from '../services/productService.js';
import authService from '../services/authService.js';

const router = express.Router();

// admin
router.get("/", authService.sessionChecker, authService.levelAdminChecker, productService.getProduct);
router.get("/:id", authService.sessionChecker, authService.levelAdminChecker, productService.getProduct);
router.post("/", authService.sessionChecker, authService.levelAdminChecker, productService.createProduct);
router.put("/:id", authService.sessionChecker, authService.levelAdminChecker, productService.updateProduct);
router.delete("/:id", authService.sessionChecker, authService.levelAdminChecker, productService.deleteProduct);

export default router;