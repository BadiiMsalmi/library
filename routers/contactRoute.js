const route=require('express').Router()
const contactController=require('../controllers/contactController')
const guardAuth=require('./guardAuth')


route.get('/',contactController.getContactPage,guardAuth.isAuth)

module.exports=route