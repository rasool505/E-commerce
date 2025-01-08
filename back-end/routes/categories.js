import express from "express";
import multer from "multer";
import { createNewCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory } from "../controllers/categoreisController.js";
import { verifyWriterToken } from "../middlewares/verifyToken.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
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
const cpUpload = upload.single('image');

// /api/categories
route.route("/")
.post(verifyWriterToken, cpUpload, createNewCategory)
.get(getAllCategories)

// /api/categories/:id
route.route("/:id")
.put(verifyWriterToken, cpUpload, updateCategory)
.delete(verifyWriterToken, deleteCategory)
.get(verifyWriterToken, getCategoryById)


export default route;