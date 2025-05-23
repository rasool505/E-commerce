import Cart, { validateCart } from "../models/Cart.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import mongoose from "mongoose";


/**
 *  @desc Get All Carts
 *  @route /api/carts
 *  @method GET
 *  @access protected
 */
export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({}).populate("user", ["name", "location"]).populate("assignedTo", ["name", "amountOfCarts"]);
        // check if carts is exist
        if(carts === null || carts.length === 0)
            return res.status(404).json({message: "carts is not found"});
        // respones the result
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 *  @desc Get All Carts Of Delivery
 *  @route /api/carts/:id
 *  @method GET
 *  @access protected
 */
export const getAllCartsOfDelivery = async (req, res) => {
    console.log(req.params.id)
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid delivery agent ID" });
        }

        const cartsOfDelivery = await Cart.find({assignedTo: req.params.id})
        .select('products status totalPrice')
        .populate('products.productId', [ 'title', 'price', 'discount', { strictPopulate: false }])  
        .populate('user', ['name', 'location', 'phone'])

        // check if carts is exist
        if(cartsOfDelivery === null || cartsOfDelivery.length === 0)
            return res.status(404).json({message: "carts is not found"});

        // respones the result
        res.status(200).json(cartsOfDelivery);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

/**
 *  @desc  assignedToDelivery
 *  @route /api/carts/:id
 *  @method PUT
 *  @access protected
 */
export const assignedToDelivery = async (req, res) => {
    const {assignedTo} = req.body;
    try {
        const userDelivery = await User.findById(assignedTo);
        if(!userDelivery)
            return res.status(404).json({message: "user is not found!"});
        else if(userDelivery.role !== 2)
            return res.status(400).json({message: "user is not allowed to be delivery!"});

        const cart = await Cart.findById(req.params.id);
        if (cart.assignedTo == assignedTo) {
            return res.status(400).json({message: "a cart has already been given to this delivery!"});
        }

        const updateCart = await Cart.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    status: "shipped",
                    assignedTo: assignedTo
                }
            }, 
            {new: true} 
        );

        userDelivery.amountOfCarts += 1;
        await userDelivery.save();

        res.status(201).json(updateCart);

    } catch (error) {
        res.json({message: error.message})
    }

}

/**
 *  @desc  Cart Is Delivered
 *  @route /api/carts/:id
 *  @method PUT
 *  @access protected
 */
export const cartIsDelivered = async (req, res) => {
    try {
        let cart = await Cart.findById(req.params.id);
        // check if carts is exist
        if(cart === null || cart.length === 0)
            return res.status(404).json({message: "cart is not found"});

        for (const product of cart.products) {
            const productData = await Product.findById({_id: product.productId});
            productData.stock -= product.quantity;
            if(productData.stock == 0){
                productData.available = false;
            }
            await productData.save();
        }

        const userDelivery = await User.findById(cart.assignedTo);
        await User.findByIdAndUpdate(cart.assignedTo, {
            $set: {
                amountOfCarts: userDelivery.amountOfCarts - 1
            }
        },{new: true});

        cart = await Cart.findByIdAndUpdate(req.params.id, {
           $set: {
            status: "delivered",
            assignedTo: null
            }
        }, {new: true});


        res.status(201).json(cart);

    } catch (error) {
        res.json({message: error.message})
    }

}

/**
 *  @desc  Cart Is Cancelled
 *  @route /api/carts/:id
 *  @method PUT
 *  @access protected
 */
export const cartIsCancelled = async (req, res) => {
    try {
        let cart = await Cart.findById(req.params.id);
        // check if carts is exist
        if(cart === null || cart.length === 0)
            return res.status(404).json({message: "cart is not found"});

        const userDelivery = await User.findById(cart.assignedTo);
        await User.findByIdAndUpdate(cart.assignedTo, {
            $set: {
                amountOfCarts: userDelivery.amountOfCarts - 1
            }
        },{new: true});
        cart = await Cart.findByIdAndUpdate(req.params.id, {
        $set: {
            status: "cancelled",
            assignedTo: null
            }
        }, {new: true});


        res.status(201).json(cart);

    } catch (error) {
        res.json({message: error.message})
    }

}


/**
 *  @desc Create New Cart
 *  @route /api/carts
 *  @method POST
 *  @access protected
 */
export const createNewCart = async (req, res) => {
    const { user, products } = req.body;
    const { error } = validateCart(req.body);
    if (error)
        return res.status(400).json({ message: error.details[0].message });

    try {
        let totalPrice = 0;
        const productIds = products.map(product => product.productId);
        const productsData = await Product.find({ _id: { $in: productIds } });

        for (const product of products) {
            const productData = productsData.find(p => p._id.toString() === product.productId.toString());
            if (!productData.available) {
                return res.status(400).json({ message: `This product ${productData.title} is not available` });
            }
            const stock = productData.stock;
            if (product.quantity > stock) {
                return res.status(400).json({
                    message: `Insufficient quantity. This product ${productData.title} has only this stock: ${stock}`,
                    availableStock: stock
                });
            }
            
            let productPrice = productData.price;
            if (productData.discount) {
                productPrice = productPrice - (productPrice * productData.discount);
            }

            totalPrice += productPrice * product.quantity;
        }

        const newCart = new Cart({
            user: user,
            products: products,
            totalPrice: totalPrice,
        });
        await newCart.save();
        res.status(201).json(newCart);

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
}


/**
 *  @desc Delete Carts
 *  @route /api/carts/:id
 *  @method DELETE
 *  @access protected
 */
export const deleteCart = async (req, res)=>{
    try {
        let cart = await Cart.findById(req.params.id);
        if(!cart)
            return res.status(404).json({message: "the cart is not found."});

        const userDelivery = await User.findById(cart.assignedTo);
        if(userDelivery !== null && userDelivery.length != 0){
        await User.findByIdAndUpdate(cart.assignedTo, {
            $set: {
                amountOfCarts: userDelivery.amountOfCarts - 1,
            }
        },{new: true});
        }

        cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "the cart have been deleted successfully."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}