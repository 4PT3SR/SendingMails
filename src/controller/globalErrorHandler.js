const AppError = require('../utils/appError')

const joiHandler = (err) => {

    return new AppError(`${err.message}`.replace(/[^\w\s]/gi, ''),400);
}

const sendError = (err,res) => {
    if(err.isOperational) {
        res.status(err.statusCode).json({status:'Fail',message:err.message});

    } else {
        res.status(500).json({status:'Error',message:'Oops.. something went wrong, try again later'});

    }
}
module.exports = (err,req,res,next) => {
    let error = {...err,message:err.message};
    if(error.details) error = joiHandler(error);

    sendError(error,res);
}
