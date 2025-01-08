import mongoose from "mongoose";
import Joi from "joi";

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        minlength: 3,
        maxlength: 100,
        trim: true,
        required: true,
        unique: true
    },
    image: {
        type: String,
    },

}, {timestamps: true});

const Category = mongoose.model("Category", categorySchema);

export default Category;

export const validateCategory = (category) => {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(100).required(),
      image: Joi.string().uri().allow('').optional(),
    });
    return schema.validate(category)
}

export const validateUpdateCategory = (category) => {
    const schema = Joi.object({
      title: Joi.string().trim().min(3).max(100).optional(),
      image: Joi.string().uri().allow('').optional(),
    });
    return schema.validate(category)
}