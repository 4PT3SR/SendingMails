const joi = require('joi');
const sendMail = require('../utils/sendMail')
const schema = joi.object({
    email: joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

module.exports = async (req,res,next) => {
    try {
        const payload = await schema.validateAsync(req.body);
        const {email} = payload;
        await sendMail(email);
        res.status(200).json({message:'Mail sent successfully,check your inbox'});
    } catch (e) {
        // console.log(e)
        next(e);
    }
}