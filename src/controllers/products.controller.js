//CRUD

import Product from "../models/product.model.js";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// Hämta alla produkter
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().exec();
    res.status(200).json(products);
});

// Hämta en enskild produkt
export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Ogiltigt produkt-ID" });
    }

    const product = await Product.findById(id).exec();

    if (!product) {
        return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.status(200).json(product);
});

// Lägga till en produkt
export const createProduct = asyncHandler(async (req, res) => {
    console.log("Raw request body:", req.body);

    const { name, price, description, category, images } = req.body;

    if (!name || !price || !description || !category || !images) {
        return res.status(400).json({
            error: "Alla fält måste fyllas i",
        });
    }

    const newProduct = await Product.create({ name, price, description, category, images });

    res.status(201).json(newProduct);
});

// Uppdatera en produkt
export const updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Ogiltigt produkt-ID" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).exec();

    if (!updatedProduct) {
        return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.status(200).json(updatedProduct);
});

// Ta bort en produkt
export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Ogiltigt produkt-ID" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id).exec();

    if (!deletedProduct) {
        return res.status(404).json({ error: "Produkten hittades inte" });
    }

    res.status(200).json({ message: "Produkten har tagits bort" });
});
