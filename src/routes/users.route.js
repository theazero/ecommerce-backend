//Här är all kod om användnarna/
import express, { Router } from 'express'
import { getAllUsers, createUser, loginUser, getUserProfile } from "../controllers/users.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router()



router.get('/', getAllUsers);


//registering av andändare (VG)
router.post('/register', createUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile );
router.get("/", getAllUsers);


export default router