// skicka meddelande 

import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "Alla fält måste fyllas i" });
    }

    res.status(200).json({ message: "Meddelandet har skickats!" });
});

export default router;
