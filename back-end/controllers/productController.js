import Product, { validateProduct, validateUpdateProduct } from "../models/Product.js";
import Category from "../models/Category.js";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 *  @desc Get All Products
 *  @route /api/products
 *  @method GET
 *  @access protected
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).select('-images').populate("categoryId", ["title"]);
        // check if products is exist
        if(products === null || products.length === 0)
            return res.status(404).json({message: "products is not found"});
        // respones the result
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 *  @desc Get Product By Id
 *  @route /api/products/:id
 *  @method GET
 *  @access protected
 */
export const getProductById = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id).populate("categoryId", ["_id", "title"]);
        // check if products is exist
        if(products === null || products.length === 0)
            return res.status(404).json({message: "product is not found"});
        // respones the result
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 *  @desc Get Products By Category Id
 *  @route /api/products/:categoryId
 *  @method GET
 *  @access protected
 */
export const getProductsByCategoryId = async (req, res) => {
    try {
        // category id from user request
        const {categoryId} = req.params;
        if(!categoryId){
            return res.status(400).json({message: "categoryid is required"});
        }
        // check if category is exist
        const  category = await Category.findById(categoryId);
        if (category === null || category.length === 0)
            return res.status(404).json({message: "category is not found"});

        // check if products is exist
        if (res.paginatedResults.results === null || res.paginatedResults.results.length === 0)
            return res.status(404).json({message: "products is not found"})

        // respones the result
        res.status(200).json(res.paginatedResults);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


/**
 *  @desc Create New Product
 *  @route /api/products
 *  @method POST
 *  @access protected
 */
export const createNewProduct = async (req, res) => {
    const {categoryId, title, description, price, discount, stock} = req.body;
    const { error } = validateProduct(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});
    
    try {
        if(!categoryId){
            return res.status(400).json({message: "categoryid is required"});
        }

        
        // convert images to URL
        let images = [];
        if(req.files)
            images = await req.files.map((image)=> (`${req.protocol}://${req.get("host")}/${image.filename}`))
        
        const product = await new Product({
            categoryId: categoryId,
            title: title,
            description: description,
            stock: stock,
            price: price,
            discount: (discount / 100),
            images: images,
        });
        await product.save();
        res.status(201).json(product);

    } catch (error) {
        res.json({message: error.message})
    }

}

/**
 *  @desc Update Product
 *  @route /api/products/:id
 *  @method PUT
 *  @access protected
 */
export const updateProduct = async (req, res) => {
    const {categoryId, title, description, price, discount, stock, available} = req.body;
    const { error } = validateUpdateProduct(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});
    try {

        // convert images to URL
        let images = [];
        if(req.files)
            images = await req.files.map((image)=> (`${req.protocol}://${req.get("host")}/${image.filename}`))

        const product = await Product.findByIdAndUpdate(req.params.id, {
            $set: {
                categoryId: categoryId,
                title: title,
                description: description,
                stock: stock,
                price: price,
                discount: (discount / 100),
                images: images,
                available: available
            }
        },{new: true})
        
        res.status(200).json(product)
    } catch (error) {
        res.json({message: error.message})
    }
}

/**
 *  @desc Delete Product
 *  @route /api/products/:id
 *  @method DELETE
 *  @access protected
 */
export const deleteProduct = async (req, res)=>{
    try {
        let product = await Product.findById(req.params.id);
        if(!product)
            return res.status(404).json({message: "the product is not found."})
        product.images.forEach(image => {
            const imagesfolder = path.join(__dirname, "../images")
            const imagePath = path.join(imagesfolder, image.substring(image.lastIndexOf('/') + 1));
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        });
        await product.deleteOne();
        res.status(200).json({message: "the product have been deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}