import asyncHandler from "express-async-handler";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Skapar en order
export const createOrder = asyncHandler(async (req, res) => {
    const { products } = req.body;

    if (!products || products.length === 0) {
        return res.status(400).json({ error: "Ingen produkt vald" });
    }

    let totalPrice = 0;
    for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) {
            return res.status(404).json({ error: `Produkten med id ${item.productId} hittades inte` });
        }
        totalPrice += product.price * item.quantity;
    }

    const order = await Order.create({
        user: req.user._id,
        products,
        totalPrice,
    });

    res.status(201).json(order);
});

// Hämta orderhistoriken för en användare
export const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id })
        .populate({
            path: "products.productId",
            select: "name price description category images"
        })
        .exec();

    res.status(200).json(orders);
});

