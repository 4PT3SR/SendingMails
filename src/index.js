const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config({path: path.resolve(__dirname, './.env')})


const emailRouter = require('./routes/email')
const globalErrorHandler = require('./controller/globalErrorHandler')
const error404 = require('./controller/error404')

app.use(express.json());
app.use(express.urlencoded({ extended:false}));
const PORT = process.env.PORT || 6000;



app.use('/',emailRouter)

app.all('*', error404)

app.use(globalErrorHandler);

app.listen(PORT, ()=> console.log(`listening on port ${PORT}`))
