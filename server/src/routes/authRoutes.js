import express from "express";
import { signup, login } from "../controllers/authController.js"

const router = express.Router();
router.post("/signup", signup)
router.post("/login", login)
const res = {
    "name": "radhe radhe",
    "value": signup
}
export default router;