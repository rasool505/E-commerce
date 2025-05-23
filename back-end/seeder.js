import Product from "./models/Product.js";
import { products } from "./data.js";
import { connectDB } from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config()

//connection to db
connectDB();

// Import Products
const importProducts = async ()=>{
    try {
        await Product.insertMany(products);
        console.log("Products Imported!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


// Remove Products
const removeProducts = async ()=>{
    try {
        await Product.deleteMany();
        console.log("Products Removed!")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if (process.argv[2] === "-import") {
    importProducts()
} else if(process.argv[2] === "-remove"){
    removeProducts()
}