dotenv.config();

//Skapa en express applikation

import express from 'express'
import mongoose from 'mongoose';
import { type } from 'os';
import dotenv from 'dotenv';
dotenv.config(); 
import users from './routes/users.route.js';
import productsRoute from "./routes/products.route.js";
import Product from './models/product.model.js';
import messagesRoute from './routes/messages.route.js';
import { notFound, errorHandler } from './middleware/error.middleware.js';
import userRoutes from "./routes/users.route.js";
import orderRoutes from "./routes/order.route.js";


const app = express();
app.use(express.json());

app.use("/api/products", productsRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 9999
const MONGO_URI = process.env.MONGO_URI

app.use(express.json()); //vrf två gånger

app.use(notFound) //felhantering notfound från middleware
app.use(errorHandler) //felhantering errorhandler middleware


//Starta igång servern
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI); // Ta bort onödiga alternativ
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1); // Stoppa servern vid anslutningsfel
    }
};

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
    connectDB();
})









