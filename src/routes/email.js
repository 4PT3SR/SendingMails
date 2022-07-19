const router = require('express').Router();
const emailController = require('../controller/email')
router.post('/',emailController)

module.exports = router;