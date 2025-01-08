import mongoose from "mongoose";
import Joi from "joi";

const adsSchema = mongoose.Schema({
    description: {
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
    available: {
        type: Boolean,
        default: true,
    },

}, {timestamps: true});

const Ads = mongoose.model("Ads", adsSchema);

export default Ads;

export const validateAds = (obj) => {
    const schema = Joi.object({
        description: Joi.string().trim().min(3).max(100).required(),
        image: Joi.string().uri().allow('').optional(),
        available: Joi.boolean().default(true).optional(),
    });
    return schema.validate(obj)
}

export const validateUpdateAds = (obj) => {
    const schema = Joi.object({
        description: Joi.string().trim().min(3).max(100).optional(),
        image: Joi.string().uri().allow('').optional(),
        available: Joi.boolean().default(true).optional()
    });
    return schema.validate(obj)
}