//Här kodar du så man kan skicka meddelande 
//''Ni ska skapa en separat endpoint där användaren kan skicka ett meddelande med en POST. Där ska ni validera att fälten `name`, `email` & `message` har skickats med. Returnera en status 200 om fälten är korrekt skickade, annars en status 400. Meddelanden behöver inte sparas i databasen.''

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
