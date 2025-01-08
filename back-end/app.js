import express from "express";
import { logger } from "./middlewares/logger.js";
import cors from "cors";
import helmet from "helmet";
import authRouter from "./routes/auth.js";
import dotenv from "dotenv";
import {notFound, errorHandler} from "./middlewares/errors.js";
import { connectDB } from "./config/db.js";
import usersRouter from "./routes/users.js";
import productRouter from "./routes/product.js";
import cartsRouter from "./routes/carts.js";
import CategoriesRouter from "./routes/categories.js";
import AdsRouter from "./routes/ads.js";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// init env
dotenv.config();

//connect to db
connectDB();

// init app
const app = express();

// Static folder
app.use(express.static(path.join(__dirname, "images")));
// Apply middlaweres
app.use(express.json());
app.use(logger);

// Helmet
app.use(helmet());

// Cores policy
app.use(cors())

//Routes
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/categories", CategoriesRouter);
app.use("/api/ads", AdsRouter);

// Error middlawere
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, "0.0.0.0",()=>{
    console.log(`server runing in ${process.env.MODE_ENV} mode on: http://localhost:${process.env.PORT}/`);
})
