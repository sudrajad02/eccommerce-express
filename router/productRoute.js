import express from "express";
import productService from '../services/productService.js';

const router = express.Router();

//user
router.get("/", productService.getProduct);
router.get("/:id", productService.getProduct);

export default router;