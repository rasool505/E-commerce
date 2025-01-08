

export function paginatedResults(model){
    return async (req, res, next)=>{
        const {categoryId} = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        const  results = {};
        
        if (endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }
        if (startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }
        
        try {
            results.results = await model.find({categoryId: categoryId}).limit(limit).skip(startIndex).exec()
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}