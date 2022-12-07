const bookModel=require('../models/bookModel')


exports.getThreeBookController=(req,res,next)=>{

    bookModel.getThreeBooks().then(books=>{
        res.render('index',{books:books,verifUser:req.session.userId})
    })
}

