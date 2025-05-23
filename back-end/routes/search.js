import express from "express";
import { getAllBySearchProducts } from "../controllers/searchController.js";
import Product from "../models/Product.js";
import { paginatedSearchResults } from "../middlewares/paginatedSearchResults.js";
const route = express.Router();
// /api/sreach/products
route.get("/:title",paginatedSearchResults(Product), getAllBySearchProducts);
export default route;
