const router=require('express').Router()
const authController=require('../controllers/authController')
const body=require('express').urlencoded({extended:true})
const guardAuth=require('./guardAuth')

router.get('/register',guardAuth.isNotAuth,authController.getRegisterPage)
router.post('/register',body,authController.postRegisterData)

router.get('/login',guardAuth.isNotAuth,authController.getLoginPage)
router.post('/login',body,authController.postLoginData)

router.post('/logout',body,authController.logoutFunctionController)


module.exports=router 