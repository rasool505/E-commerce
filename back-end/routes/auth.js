import express from "express";
import { login, register } from "../controllers/authController.js";
const route = express.Router();

// /api/users/register
route.post("/register", register)

// /api/users/login
route.post("/login", login)


export default route;