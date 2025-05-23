

export function paginatedSearchResults(model){
    return async (req, res, next)=>{
        const page = parseInt(req.query.page) || 0;
        const limit = parseInt(req.query.limit) || 0;

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
        let query = ""
        try {
            console.log(req.params.title.length)
            if (req.params.title.length === 1) {
                query = {title:{ $regex: `^${req.params.title}`, $options: 'i' }}
            } else {
                query = {title:{ $regex: `\\b${req.params.title}\\b`, $options: 'i' }}
            }
            results.results = await model.find(query).exec()
            res.paginatedResults = results;
            next();
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}