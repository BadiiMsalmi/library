const bookController= require('../controllers/bookController')
const router=require('express').Router()
const GuardAuth=require('./guardAuth')
const multer=require('multer')

router.get('/',GuardAuth.isAuth,bookController.getAddBookController)
router.post('/',multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(res,file,cb){
            cb(null,Date.now() +'-'+ file.originalname)   
        }   
    })
}).single('image'),GuardAuth.isAuth,bookController.postAddBookController)




module.exports=router