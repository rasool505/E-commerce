import express from "express";
import { createNewProduct, deleteProduct, getAllProducts, getProductById, getProductsByCategoryId, updateProduct } from "../controllers/productController.js";
import multer from "multer";
import { verifyUserToken, verifyWriterToken  } from "../middlewares/verifyToken.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { paginatedResults } from "../middlewares/paginatedResults.js";
import Product from "../models/Product.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const route = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, callBack){
        callBack(null, path.join(__dirname, "../images"));
    },
    filename: function(req, file, callBack){
        callBack(null, new Date().toISOString().replace(/:/g, "-") + file.originalname)
    }
})

const upload = multer({storage: storage})
const cpUpload = upload.array('images', 3);

// /api/products
route.route('/')
.post(verifyWriterToken, cpUpload, createNewProduct)
.get(verifyWriterToken, getAllProducts);

// /api/products/:categoryId
route.get("/:categoryId", paginatedResults(Product), getProductsByCategoryId);

// /api/products/:id
route.route('/:id')
.put(verifyWriterToken, cpUpload, updateProduct)
.delete(verifyWriterToken, deleteProduct)
route.get("/product/:id", getProductById)

export default route;