import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
import Joi from "joi";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50,
        trim: true
    },
    email: {
        type: String,
        require: true,
        minlength: 10,
        maxlength: 100,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
        minlength: 8,
        trim: true
    },
    location: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 100,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        equallenght: 11
    },
    role: {
        type: Number,
        default: 1
        /**
         * admin role 0
         * user role 1
         * delivery 2
         * writer 3
         */
    },
    amountOfCarts: {
        type: Number,
        default: 0
    }
}, {timestamps: true})


//Generate Token
userSchema.methods.generateToken = function(ipAddress){
    return jwt.sign({id: this._id, role: this.role, ip: ipAddress }, process.env.JWT_SECRET_KEY);

}


const User = mongoose.model("User", userSchema);

export function validateRegisterUser(obj){
    const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().min(10).max(100).required(),
    password: passwordComplexity().required(),
    location: Joi.string().trim().min(2).max(100).required(),
    phone: Joi.string().length(11).trim().required(),
    amountOfCarts: Joi.number().optional()
    })
    return schema.validate(obj)
}

export function validateAddUser(obj){
    const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().min(10).max(100).required(),
    password: passwordComplexity().required(),
    location: Joi.string().trim().min(2).max(100).required(),
    phone: Joi.string().length(11).trim().required(),
    role: Joi.number().required(),
    amountOfCarts: Joi.number().optional()
    })
    return schema.validate(obj)
}

export function validateLoginUser(obj){
    const schema = Joi.object({
        email: Joi.string().trim().min(10).max(100).required(),
        password: passwordComplexity().required()
    })
    return schema.validate(obj)
}

export function validateUpdateUser(obj){
    const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).optional(),
    email: Joi.string().trim().min(10).max(100).optional(),
    password: passwordComplexity().optional(),
    location: Joi.string().trim().min(2).max(100).optional(),
    phone: Joi.string().length(11).trim().optional(),
    amountOfCarts: Joi.number().optional()
    })
    return schema.validate(obj)
}

export default User;