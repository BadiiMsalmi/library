const { render } = require('ejs')
const bookModel = require('../models/bookModel')


exports.getAllBooksController = (req, res, next) => {

    bookModel.getAllBooks().then(books => {
        res.render('books', { books: books, verifUser: req.session.userId })
    })
}

exports.getOneBookDetailsController = (req, res, next) => {
    let id = req.params.id
    bookModel.getOneBookDetails(id).then(resbook => {
        res.render('details', { book: resbook, verifUser: req.session.userId })
    })
}


exports.getmyBooksPage = (req, res, next) => {
    bookModel.getMyBooks(req.session.userId).then((books) => {
        res.render('mybooks', { verifUser: req.session.userId, books: books })
    })

}


exports.getAddBookController = (req, res, next) => {
    res.render('addbook', { verifUser: req.session.userId, Smessage: req.flash('Smessage')[0], Emessage: req.flash('Emessage')[0] })


}

exports.postAddBookController = (req, res, next) => {
    bookModel.postDataBookModel(req.body.title, req.body.description, req.body.author, req.body.price, req.file.filename, req.session.userId).then((msg) => {
        req.flash('Smessage', msg)
        res.redirect('/addbook')
    }).catch((err) => {
        req.flash('Emessage', err)
        res.redirect('/addbook')

    })

}

exports.deleteBookController = (req, res, next) => {
    let id = req.params.id
    bookModel.deleteBook(id).then((verif) => {
        res.redirect('/mybooks')
    }).catch((err) => {
    })
}


exports.getmyBooksUpdatePage=(req,res,next)=>{
    let id=req.params.id
    bookModel.getUpdateBookPageModel(id).then((book)=>{
        console.log(book)
        res.render('updateBook',{bookUpdate:book,verifUser:req.session.userId,Smessage:req.flash('Smessage')[0],Emessage:req.flash('Emessage')[0]})
    })

    

}

exports.postUpdateBookController = (req, res, next) => {
    if(req.file){
        bookModel.postUpdateBookModel(req.body.bookId, req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg) => {
            req.flash('Smessage', msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('Emessage', err)
            console.log(err);
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }else{
        bookModel.postUpdateBookModel(req.body.bookId,req.body.title,req.body.description,req.body.author,req.body.price,req.body.oldImage,req.session.userId).then((msg) => {
            req.flash('Smessage', msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        }).catch((err)=>{
            req.flash('Emessage', err)
            console.log(err);
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }
    
}

