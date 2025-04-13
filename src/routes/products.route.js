import express from "express";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} from "../controllers/products.controller.js";

const router = express.Router();

router.get("/", getAllProducts); //READ
router.get("/:id", getProductById); //READ
router.post("/", createProduct); //CREATE
router.put("/:id", updateProduct); // UPDATE
router.delete("/:id", deleteProduct); //DELETE

export default router;
