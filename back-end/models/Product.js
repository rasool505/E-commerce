import mongoose from "mongoose";
import Joi from 'joi';


const productSchema = mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: true
    },
    description: {
        type: String,
        minlength: 3,
        maxlength: 200,
        trim: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
    },
    available: {
        type: Boolean,
        default: true,
    },

}, {timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;

export const validateProduct = (product) => {
    const schema = Joi.object({
      categoryId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
      title: Joi.string().trim().min(3).max(100).required(),
      description: Joi.string().trim().min(3).max(500).optional(),
      stock: Joi.number().required().min(0),
      price: Joi.number().required().min(0),
      discount: Joi.number().min(0).optional(),
      available: Joi.boolean().default(true).optional(),
      images: Joi.array().min(0).items(Joi.string().trim().uri().allow('').optional()).optional()
      
    });
    return schema.validate(product)
}
export const validateUpdateProduct = (product) => {
    const schema = Joi.object({
      categoryId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).optional(),
      title: Joi.string().min(3).max(100).trim().optional(),
      description: Joi.string().min(3).max(500).trim().optional(),
      stock: Joi.number().min(0).optional(),
      price: Joi.number().min(0).optional(),
      discount: Joi.number().min(0).optional(),
      images: Joi.array().items(Joi.string().uri()).allow('').optional(),
      available: Joi.boolean().default(true).optional()
    });
    return schema.validate(product)
}