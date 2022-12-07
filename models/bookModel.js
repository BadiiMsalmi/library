const mongoose = require('mongoose')
const { resolve } = require('path')


var schemaBook = mongoose.Schema({
    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
    userId: String
})


var Book = mongoose.model('book', schemaBook)
var url = "mongodb://localhost:27017/library"

exports.getThreeBooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({}).limit(3)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))


    })
}



exports.getAllBooks = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({})
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))


    })
}

exports.getOneBookDetails = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.findById(id)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))


    })
}

exports.postDataBookModel = (title, description, author, price, filename, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            let book = new Book({
                title: title,
                price: price,
                image: filename,
                author: author,
                description: description,
                userId: userId
            })
            return book.save()
        }).then(() => {
            mongoose.disconnect()
            resolve('Book added successfully !')
        }).catch((err) => {
            reject(err)
        })
    }
    )
}

exports.getMyBooks = (userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.find({ userId: userId })
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))


    })
}

exports.deleteBook = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.deleteOne({ _id: id })
        }).then(books => {
            mongoose.disconnect()
            resolve(true)
        }).catch(err => reject(err))


    })
}


exports.getUpdateBookPageModel = (id) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {
            return Book.findById(id)
        }).then(books => {
            mongoose.disconnect()
            resolve(books)
        }).catch(err => reject(err))


    })
}

exports.postUpdateBookModel = (bookId, title, description, author, price, filename, userId) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(url).then(() => {

            return Book.updateOne({ _id: bookId }, { title: title , description: description ,  author: author ,  price: price ,  image: filename ,userId:userId})
        }).then(() => {
            mongoose.disconnect()
            resolve('Book updated successfully !')
        }).catch((err) => {
            mongoose.disconnect()
            reject('Error')
        })
    }
    )
}