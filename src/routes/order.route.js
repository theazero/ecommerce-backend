import express from "express";
import { createOrder, getOrders } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, createOrder); // Skapa en order
router.get("/", protect, getOrders); // Hämta orderhistoriken

export default router;
