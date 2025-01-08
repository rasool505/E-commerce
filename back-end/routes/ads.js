import express from "express";
import multer from "multer";
import { verifyWriterToken } from "../middlewares/verifyToken.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createNewAd, deleteAd, getAdById, getAllAds, updateAd } from "../controllers/adsController.js";
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

// /api/ads
route.route("/")
.post(verifyWriterToken, cpUpload, createNewAd)
.get(getAllAds)

// /api/ads/:id
route.route("/:id")
.put(verifyWriterToken, cpUpload, updateAd)
.delete(verifyWriterToken, deleteAd)
.get(verifyWriterToken, getAdById)


export default route;