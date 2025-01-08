import User, { validateAddUser, validateUpdateUser } from "../models/User.js"
import bcrypt from "bcryptjs";

/**
 * @desc Add User
 * @route /api/users/add/user
 * @method POST
 * @access private 
 */
export const addUser = async (req, res) => {
    const {error} = validateAddUser(req.body)
    if(error)
        return res.status(400).json({message: error.details[0].message})

    try{

        let user = await User.findOne({email: req.body.email})
        if(user)
            return res.status(400).json({message: 'this is user already registered'})
        
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            location: req.body.location,
            phone: req.body.phone,
            role: req.body.role
        });
        const result = await user.save()
        const {password, ...other} = result._doc;
        const token = user.generateToken(req.ip);
        res.status(201).json({...other, token})
    } catch(error){
        res.status(500).json({message: error.message})
    }
}


/**
 *  @desc Get all users
 *  @route /api/users
 *  @method GET
 *  @access private (only admin)
 */
export const getAllUsers = async (req, res)=>{
    try{
        const users = await User.find({}).select('-password');
        if (users === null || users.length === 0)
            return res.status(400).json({message: "users is not found"})

        res.status(200).json(users)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Get all users
 *  @route /api/users
 *  @method GET
 *  @access private (only admin)
 */
export const getAllDlivery = async (req, res)=>{
    try{
        const users = await User.find({role: 2}).select('-password -location -email -createdAt -updatedAt -role -phone');
        if (users === null || users.length === 0)
            return res.status(400).json({message: "users is not found"})

        res.status(200).json(users)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Get user by id
 *  @route /api/users/:id
 *  @method GET
 *  @access private (any)
 */
export const getUserById = async (req, res)=>{
    try{
        const users = await User.findById(req.params.id).select('-password -amountOfCarts');
        if (users === null || users.length === 0)
            return res.status(400).json({message: "user is not found"})

        res.status(200).json(users)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Get user
 *  @route /api/users/me
 *  @method GET
 *  @access private (any)
 */
export const getUser = async (req, res)=>{
    try{
        const users = await User.findById(req.user.id).select('-password -amountOfCarts');
        if (users === null || users.length === 0)
            return res.status(400).json({message: "user is not found"})

        res.status(200).json(users)
    } catch(error){
        res.status(400).json({message: error.message})
    }
}

/**
 *  @desc Update user
 *  @route /api/users/:id
 *  @method Put
 *  @access protected
 */
export const updateUser = async (req, res)=>{
    const {error} = validateUpdateUser(req.body)
    if (error)
        return res.status(400).json({message: error.details[0].message});

    try {
        let user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(400).json({message: "Invalid request"});

        if(req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt); 
        }

        user = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                location: req.body.location,
                phone: req.body.phone
            }
        }, {new: true});

        const token = user.generateToken(req.ip);
        res.status(200).json({user, token});

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 *  @desc Delete user
 *  @route /api/users/:id
 *  @method DELETE
 *  @access protected
 */
export const deleteUser = async (req, res)=>{
    try {
        let user = await User.findById(req.params.id);
        if(!user)
            return res.status(400).json({message: "the user is not found."})

        user = await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "the user have been deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}