import express from "express";
import { assignedToDelivery, cartIsCancelled, cartIsDelivered, createNewCart, deleteCart, getAllCarts, getAllCartsOfDelivery } from "../controllers/cartController.js";
import { verifyWriterToken, verifyDeliveryToken, verifyUserCartToken  } from "../middlewares/verifyToken.js";
const route = express.Router();

// /api/carts
route.route('/')
.get(verifyWriterToken, getAllCarts)
.post(verifyUserCartToken, createNewCart);

// /api/carts/:id
route.route('/:id')
.put(verifyWriterToken, assignedToDelivery)
.delete(verifyWriterToken, deleteCart);

// /api/carts/all/delivery/:id
route.get("/all/delivery/:id", verifyDeliveryToken, getAllCartsOfDelivery)
// /api/carts/delivered/:id
route.put("/delivered/:id", verifyDeliveryToken, cartIsDelivered)

// /api/carts/cancelled/:id
route.put("/cancelled/:id", verifyDeliveryToken, cartIsCancelled)

export default route;