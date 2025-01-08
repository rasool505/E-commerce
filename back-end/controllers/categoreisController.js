import Category, { validateCategory, validateUpdateCategory } from '../models/Category.js'
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 *  @desc Get Category By Id
 *  @route /api/categories/:id
 *  @method GET
 *  @access protected
 */
export  const getCategoryById = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id);
        if (category === null || category.length === 0)
            return res.status(400).json({message: "category is not found"})

        res.status(200).json(category)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Get All Categories
 *  @route /api/categories/
 *  @method GET
 *  @access protected
 */
export  const getAllCategories = async (req, res) => {
    try{
        const categories = await Category.find({});
        if (categories === null || categories.length === 0)
            return res.status(400).json({message: "categories is not found"})

        res.status(200).json(categories)
    } catch(error){
        res.status(400).json({message: error.message})
    }
    
}


/**
 *  @desc Create New category
 *  @route /api/categories/
 *  @method POST
 *  @access protected
 */
export const createNewCategory = async (req, res) => {
    const {title} = req.body;
    const { error } = validateCategory(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});
    try {

        // convert images to URL
        let image
        if (req.file)
            image = `${req.protocol}://${req.get("host")}/${req.file.filename}`
        
        const category = await new Category({
            title: title,
            image: image,
        });
        await category.save();
        res.status(201).json(category);

    } catch (error) {
        res.json({message: error.message})
    }

}

/**
 *  @desc Update category
 *  @route /api/category/:id
 *  @method Put
 *  @access protected
 */
export const updateCategory = async (req, res) => {
    const { error } = validateUpdateCategory(req.body);
    if(error)
        return res.status(400).json({message: error.details[0].message});

    try {
        const title = req.body.title || undefined;
        let image = undefined;
        

        let category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        let existingCategory = await Category.findOne({title: title});

        if (existingCategory) {
            return res.status(400).json({ message: "Invalid request: Title already exists for another category" });
        }

        // convert images to URL
        if (req.file)
            image = `${req.protocol}://${req.get("host")}/${req.file.filename}`

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    title: title,
                    image: image
                }
            },
            { new: true } 
        );

        res.status(200).json(updatedCategory);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/**
 *  @desc Delete category
 *  @route /api/category/:id
 *  @method DELETE
 *  @access protected
 */
export const deleteCategory = async (req, res)=>{
    try {
        let category = await Category.findById(req.params.id);
        if(!category)
            return res.status(400).json({message: "the category is not found."})

            const imagesfolder = path.join(__dirname, "../images")
            const imagePath = path.join(imagesfolder, category.image.substring(category.image.lastIndexOf('/') + 1));
            if(fs.existsSync(imagePath)){
                fs.unlinkSync(imagePath)
            }
        await category.deleteOne();
        res.status(200).json({message: "the category have been deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}