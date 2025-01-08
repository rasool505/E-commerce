import User, {validateLoginUser, validateRegisterUser} from "../models/User.js";
import bcrypt from "bcryptjs";


/**
 * @desc Register
 * @route /api/auth/register
 * @method POST
 * @access public 
 */
export const register = async (req, res) => {
    const {error} = validateRegisterUser(req.body)
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
            phone: req.body.phone
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
 *  @desc Login User
 *  @route /api/auth/login
 *  @method POST
 *  @access public
 */
export const login = async (req, res)=>{
    const {error} = validateLoginUser(req.body)
    if (error)
        return res.status(400).json({message: error.details[0].message})

    try{
        let user = await User.findOne({email: req.body.email});
        if (!user)
            return res.status(400).json({message: "wrong email or password."});
        const passwordMath = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMath)
            return res.status(400).json({message: "wrong email or password."});
        const token = user.generateToken(req.ip);
        const {password, ...other} = user._doc;
        res.status(200).json({...other, token});
    } catch(error){
        res.status(500).json({message: error.message});
    }
}