const route= require('express').Router()
const guardAuth=require('./guardAuth')
const aboutController = require('../controllers/aboutController')


route.get('/',aboutController.getAboutPage,guardAuth.isAuth)


module.exports=route