const homeController= require('../controllers/homeController')
const router=require('express').Router()


router.get('/',homeController.getThreeBookController)


module.exports=router