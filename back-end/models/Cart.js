import mongoose from "mongoose";
import Joi from "joi";
const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [
        {
           productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
           },
           quantity: {
            type: Number,
            required: true,
            min: 1,
           }
        }
    ],
    totalPrice:{
        type: Number,
        required: true,
        min: 0
    },
    // admin part
    status: {
        type: String,
        enum: ['pending', 'shipped', 'delivered', 'cancelled'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    }

}, {timestamps: true});


const Cart = mongoose.model("Cart", cartSchema);

export default Cart;

export const validateCart = (product) => {
    const schema = Joi.object({
        user:  Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
        products: Joi.array().items(Joi.object({
            productId: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
            quantity: Joi.number().min(1).required()
        })).required(),
    });
    return schema.validate(product)
}
