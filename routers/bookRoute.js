const bookController= require('../controllers/bookController')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')



router.get('/',GuardAuth.isAuth,bookController.getAllBooksController)
router.get('/:id',GuardAuth.isAuth,bookController.getOneBookDetailsController)




module.exports=router