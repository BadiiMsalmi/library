const router= require('express').Router()
const bookController= require('../controllers/bookController')
const guardAuth=require('./guardAuth')
const multer=require('multer')

router.get('/',guardAuth.isAuth,bookController.getmyBooksPage)
router.get('/delete/:id',bookController.deleteBookController)

router.get('/update/:id',bookController.getmyBooksUpdatePage)
router.post('/update',multer({
    storage:multer.diskStorage({
        destination:function(req,file,cb){
            cb(null,'assets/uploads')
        },
        filename:function(res,file,cb){
            cb(null,Date.now() +'-'+ file.originalname)   
        }   
    })
}).single('image'),guardAuth.isAuth,bookController.postUpdateBookController)


module.exports=router 