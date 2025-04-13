import asyncHandler from "express-async-handler";
import User from "../models/users.model.js";
import generateToken from "../utils/token.utils.js";

// Skapar en ny användare
export const createUser = asyncHandler(async (req, res) => {
    console.log("Raw request body:", req.body); // Debug-logg

    try {
        const { firstName, lastName, email, password } = req.body;

        // Kontrollerar att alla fält är ifyllda
        if (!firstName || !lastName || !email || !password) {
            console.log("Saknade fält:", { firstName, lastName, email, password });
            return res.status(400).json({ error: "Alla fält måste fyllas i" });
        }

        // Kollar om användaren redan finns i databasen
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: "Användaren finns redan" });
        }

        console.log("Användare skapas:", firstName, lastName, email);

        // Skapar och sparar användaren
        const user = await User.create({ firstName, lastName, email, password });

        // Skickar tillbaka den skapade användaren utan lösenordet
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });

    } catch (err) {
        console.error("Server error:", err.message);
        res.status(500).json({ error: "Server Error", message: err.message });
    }
});

// Hämtar alla användare
export const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Something went wrong!" });
    }
});

// Hämtar användarens profil (kräver autentisering)
export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        });
    } else {
        res.status(404);
        throw new Error("Användare hittades inte");
    }
});

// Loggar in användare och få en JWT-token
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Fel e-post eller lösenord");
    }
});