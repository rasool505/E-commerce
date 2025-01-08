import express from "express";
import { addUser, deleteUser, getAllDlivery, getAllUsers, getUser, getUserById, updateUser } from "../controllers/usersController.js";
import { verifyAdminToken, verifyUserToken } from "../middlewares/verifyToken.js";

const route = express.Router();

// /api/users
route.get("/", verifyAdminToken, getAllUsers);
route.get("/dlivery", verifyAdminToken, getAllDlivery);
route.get("/me", verifyUserToken, getUser);
route.post("/add/user", verifyAdminToken, addUser)
// /api/users/:id
route.route("/:id")
.put(verifyUserToken, updateUser)
.delete(verifyUserToken, deleteUser)
.get(verifyAdminToken, getUserById);

export default route;