import Product from "../models/Product.js";

/**
 *  @desc Get All By Search Products
 *  @route /api/search/products
 *  @method GET
 *  @access protected
 */
export const getAllBySearchProducts = async (req, res) => {
    try {
        // // get all products
        // const products = await Product.find({title:{ $regex: `\\b${req.params.title}\\b`, $options: 'i' }});
        
        // check if products is exist
        if (res.paginatedResults.results === null || res.paginatedResults.results.length === 0)
            return res.status(404).json({message: "products is not found"})

        // respones the result
        res.status(200).json(res.paginatedResults);

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}