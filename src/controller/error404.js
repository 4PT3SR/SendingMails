const AppError = require('../utils/appError')
module.exports = (req,res,next)=> {
    next(new AppError(`this api functionality does not exist`,404))
}